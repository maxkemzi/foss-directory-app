import {GithubRateLimitDocument} from "../types/documents";

const isValidRateLimitResource = (
	resource: string
): resource is GithubRateLimitDocument["resource"] =>
	resource === "core" || resource === "search";

const isRateLimitExceeded = (
	rateLimit: GithubRateLimitDocument,
	currentTime: number
) => {
	return currentTime < rateLimit.resetTime;
};

const modelHelpers = {isValidRateLimitResource, isRateLimitExceeded};
export default modelHelpers;
