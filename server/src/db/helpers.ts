import {GithubRateLimitDocument} from "./types";

const isValidGithubRateLimitResource = (
	resource: string
): resource is GithubRateLimitDocument["resource"] =>
	resource === "core" || resource === "search";

const isGithubRateLimitExceeded = (
	rateLimit: GithubRateLimitDocument,
	currentTime: number
) => {
	return currentTime < rateLimit.resetTime;
};

export {isValidGithubRateLimitResource, isGithubRateLimitExceeded};
