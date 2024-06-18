import Document from "../../lib/Document";
import {GithubRateLimitDocument as GithubRateLimitDocumentType} from "../../types/documents";
import {GithubRateLimitFromDb} from "../../types/rows";

class GithubRateLimitDocument extends Document<GithubRateLimitDocumentType> {
	connectionId: GithubRateLimitDocumentType["connectionId"];
	resource: GithubRateLimitDocumentType["resource"];
	resetTime: GithubRateLimitDocumentType["resetTime"];

	constructor(obj: GithubRateLimitFromDb) {
		super(obj);
		this.connectionId = obj.github_connection_id;
		this.resource = obj.resource;
		this.resetTime = obj.reset_time;
	}

	toObject(): GithubRateLimitDocumentType {
		return {
			...super.toObject(),
			connectionId: this.connectionId,
			resource: this.resource,
			resetTime: this.resetTime
		};
	}
}

export default GithubRateLimitDocument;
