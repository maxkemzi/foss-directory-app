import {githubApi} from "#src/apis";
import {db, githubConnectionModel} from "#src/db";
import {GithubRepoDto} from "#src/dtos";
import {ApiError} from "#src/lib";

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

		await githubConnectionModel.insert(client, {
			userId,
			token: accessToken
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
			throw new ApiError(404, "Your are not connected to github");
		}

		return connection;
	} finally {
		client.release();
	}
};

const getReposByToken = async (token: string) => {
	const repos = await githubApi.fetchReposByToken(token);

	return repos.map(r => new GithubRepoDto(r));
};

const getReposByUserId = async (id: string) => {
	const {token} = await getConnectionByUserId(id);

	return getReposByToken(token);
};

export default {
	getOAuthUrl,
	createConnection,
	getReposByUserId
};
