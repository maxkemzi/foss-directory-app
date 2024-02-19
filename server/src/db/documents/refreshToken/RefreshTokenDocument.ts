import {RefreshToken, RefreshTokenFromDb} from "../../types";
import Document from "../Document";
import {DocumentImpl} from "../types";

class RefreshTokenDocument
	extends Document
	implements DocumentImpl<RefreshToken>
{
	userId: RefreshTokenFromDb["user_id"];
	token: RefreshTokenFromDb["token"];

	constructor(obj: RefreshTokenFromDb) {
		super(obj);
		this.userId = obj.user_id;
		this.token = obj.token;
	}

	toObject(): RefreshToken {
		return {...super.toObject(), userId: this.userId, token: this.token};
	}
}

export default RefreshTokenDocument;
