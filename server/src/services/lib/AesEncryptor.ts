import {env} from "#src/config";
import crypto from "node:crypto";

class AesEncryptor {
	private static ALGORITHM = "aes-256-cbc";
	private static KEY = env.ENCRYPTION_KEY;
	private static IV = env.ENCRYPTION_IV;

	static encrypt(payload: string): string {
		const {ALGORITHM, KEY, IV} = this;

		const cipher = crypto.createCipheriv(ALGORITHM, KEY, IV);
		let encrypted = cipher.update(payload, "utf8", "hex");
		encrypted += cipher.final("hex");

		return encrypted;
	}

	static decrypt(encryptedPayload: string): string {
		const {ALGORITHM, KEY, IV} = this;

		const decipher = crypto.createDecipheriv(ALGORITHM, KEY, IV);
		let decrypted = decipher.update(encryptedPayload, "hex", "utf8");
		decrypted += decipher.final("utf8");

		return decrypted;
	}
}

export default AesEncryptor;
