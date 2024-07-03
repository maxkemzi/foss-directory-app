import {
	RateLimitDocument as RateLimitDocumentType,
	RateLimitFromDb
} from "../types";
import Document from "./Document";

class RateLimitDocument extends Document<RateLimitDocumentType> {
	userId: RateLimitDocumentType["userId"];
	ip: RateLimitDocumentType["ip"];
	requestCount: RateLimitDocumentType["requestCount"];
	resetTime: RateLimitDocumentType["resetTime"];

	constructor(obj: RateLimitFromDb) {
		super(obj);
		this.userId = obj.user_id;
		this.ip = obj.ip;
		this.requestCount = obj.request_count;
		this.resetTime = obj.reset_time;
	}

	toObject(): RateLimitDocumentType {
		return {
			...super.toObject(),
			userId: this.userId,
			ip: this.ip,
			requestCount: this.requestCount,
			resetTime: this.resetTime
		};
	}
}

export default RateLimitDocument;
