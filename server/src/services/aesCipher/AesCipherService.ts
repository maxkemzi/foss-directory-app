import crypto, {createDecipheriv} from "node:crypto";

class AesCipherService {
	private static ALGORITHM = "aes-256-cbc";

	static encrypt(payload: string): string {
		const {key, iv} = AesCipherService.getKeyAndIv();

		const cipher = crypto.createCipheriv(AesCipherService.ALGORITHM, key, iv);
		let encrypted = cipher.update(payload, "utf8", "hex");
		encrypted += cipher.final("hex");
		return encrypted;
	}

	static decrypt(encryptedPayload: string): string {
		const {key, iv} = AesCipherService.getKeyAndIv();

		const decipher = createDecipheriv(AesCipherService.ALGORITHM, key, iv);
		let decrypted = decipher.update(encryptedPayload, "hex", "utf8");
		decrypted += decipher.final("utf8");
		return decrypted;
	}

	private static getKeyAndIv() {
		const {ENCRYPTION_KEY, ENCRYPTION_IV} = process.env;

		if (!ENCRYPTION_KEY) {
			throw new Error("ENCRYPTION_KEY environment variable is not set.");
		}

		if (!ENCRYPTION_IV) {
			throw new Error("ENCRYPTION_IV environment variable is not set.");
		}

		const key = Buffer.from(ENCRYPTION_KEY, "hex");
		const iv = Buffer.from(ENCRYPTION_IV, "hex");

		if (key.length !== 32) {
			throw new Error("Invalid encryption key length. Key must be 32 bytes.");
		}

		if (iv.length !== 16) {
			throw new Error("Invalid encryption IV length. IV must be 16 bytes.");
		}

		return {key, iv};
	}
}

export default AesCipherService;
