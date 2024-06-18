import {githubApi} from "#src/apis";
import {
	db,
	githubConnectionModel,
	githubRateLimitModel,
	modelHelpers
} from "#src/db";
import {GithubRepoDto} from "#src/dtos";
import {ApiError} from "#src/lib";
import aesCipherService from "../aesCipherService";
import {GetReposOptions, GetReposReturn} from "./types";

const PUBLIC_SERVER_URL = process.env.PUBLIC_SERVER_URL as string;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID as string;

const getOAuthUrl = (state: string) => {
	const redirectUri = `${PUBLIC_SERVER_URL}/api/integrations/github/callback`;

	const searchParams = new URLSearchParams();
	searchParams.set("client_id", GITHUB_CLIENT_ID);
	searchParams.set("state", state);
	searchParams.set("redirect_uri", redirectUri);

	return `https://github.com/login/oauth/authorize?${searchParams.toString()}`;
};

const createConnection = async ({
	userId,
	code
}: {
	userId: string;
	code: string;
}) => {
	const client = await db.getClient();

	try {
		const connection = await githubConnectionModel.findByUserId(client, userId);
		if (connection) {
			throw new ApiError(400, "You are already connected to github");
		}

		const {accessToken} = await githubApi.fetchOAuthToken(code);

		const encryptedToken = aesCipherService.encrypt(accessToken);

		await githubConnectionModel.insert(client, {
			userId,
			token: encryptedToken
		});
	} finally {
		client.release();
	}
};

const getConnectionByUserId = async (id: string) => {
	const client = await db.getClient();

	try {
		const connection = await githubConnectionModel.findByUserId(client, id);
		if (!connection) {
			throw new ApiError(401, "Your must be connected to GitHub.");
		}

		return connection;
	} finally {
		client.release();
	}
};

const getReposByToken = async (
	token: string,
	opts: GetReposOptions
): Promise<GetReposReturn> => {
	const {limit, page, search, userId} = opts;

	const client = await db.getClient();

	try {
		const [coreRateLimit, searchRateLimit] = await Promise.all([
			githubRateLimitModel.findByUserIdAndResource(client, {
				userId,
				resource: "core"
			}),
			githubRateLimitModel.findByUserIdAndResource(client, {
				userId,
				resource: "search"
			})
		]);

		const currentTime = Math.floor(Date.now() / 1000);
		if (
			(coreRateLimit &&
				modelHelpers.isRateLimitExceeded(coreRateLimit, currentTime)) ||
			(searchRateLimit &&
				modelHelpers.isRateLimitExceeded(searchRateLimit, currentTime))
		) {
			throw new ApiError(
				429,
				`GitHub API rate limit exceeded. Try again later.`
			);
		}

		const decryptedToken = aesCipherService.decrypt(token);

		const {data, totalCount} = await githubApi.fetchReposByToken(
			decryptedToken,
			{
				limit,
				page,
				search,
				onRateLimitExceeded: async ({resource, resetTime}) => {
					const connection = await githubConnectionModel.findByUserId(
						client,
						userId
					);

					if (!connection) {
						throw new ApiError(
							401,
							"GitHub connection was not found. Try to connect to GitHub again."
						);
					}

					await githubRateLimitModel.upsert(client, {
						connectionId: connection.id,
						resetTime,
						resource
					});
				}
			}
		);

		return {repos: data.map(r => new GithubRepoDto(r)), totalCount};
	} finally {
		client.release();
	}
};

export default {
	getOAuthUrl,
	getConnectionByUserId,
	createConnection,
	getReposByToken
};
