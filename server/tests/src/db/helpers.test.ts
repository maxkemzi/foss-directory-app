import {
	isGithubRateLimitExceeded,
	isValidGithubRateLimitResource
} from "#src/db";
import {GithubRateLimitDocument} from "#src/db/documents";

describe("isValidGithubRateLimitResource", () => {
	it("should return true if resource is valid", () => {
		expect(isValidGithubRateLimitResource("core")).toBe(true);
		expect(isValidGithubRateLimitResource("search")).toBe(true);
	});

	it("should return false if resource is invalid", () => {
		expect(isValidGithubRateLimitResource("invalid")).toBe(false);
		expect(isValidGithubRateLimitResource("")).toBe(false);
	});
});

describe("isGithubRateLimitExceeded", () => {
	let rateLimit: GithubRateLimitDocument;

	beforeEach(() => {
		rateLimit = new GithubRateLimitDocument({
			id: "id",
			resource: "core",
			reset_time: 1720603501995,
			github_connection_id: "id",
			created_at: "created_at",
			updated_at: "updated_at"
		});
	});

	it("should return true if the current time is before the reset time", () => {
		const timeBeforeReset = 1720603501994;

		expect(isGithubRateLimitExceeded(rateLimit, timeBeforeReset)).toBe(true);
	});

	it("should return false if the current time is after or equalt to the reset time", () => {
		const timeEqualToReset = 1720603501995;
		const timeAfterReset = 1720603501996;

		expect(isGithubRateLimitExceeded(rateLimit, timeEqualToReset)).toBe(false);
		expect(isGithubRateLimitExceeded(rateLimit, timeAfterReset)).toBe(false);
	});
});
