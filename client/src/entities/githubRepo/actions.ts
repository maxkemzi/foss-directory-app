import githubApi, {
	FetchReposResponse
} from "#src/shared/apis/integrations/github";
import {isApiError} from "#src/shared/apis/lib";
import {AppError} from "#src/shared/error";
import {getErrorMessage} from "#src/shared/helpers";
import {SafeAction} from "#src/shared/hooks";

const getByOwnership = async () => {
	try {
		const response = await githubApi.fetchRepos();
		return response;
	} catch (e) {
		const message = isApiError(e) ? e.message : "Error fetching github repos";
		throw new AppError(message);
	}
};

const safeGetByOwnership: SafeAction<
	typeof getByOwnership,
	FetchReposResponse
> = async () => {
	try {
		const response = await getByOwnership();
		return {success: "Repos has been fetched", data: response};
	} catch (e) {
		return {error: getErrorMessage(e)};
	}
};

export {getByOwnership, safeGetByOwnership};
