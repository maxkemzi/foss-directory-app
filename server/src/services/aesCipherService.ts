import crypto, {createDecipheriv} from "node:crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY as string;
const ENCRYPTION_IV = process.env.ENCRYPTION_IV as string;

const algorithm = "aes-256-cbc";
const key = Buffer.from(ENCRYPTION_KEY, "hex");
const iv = Buffer.from(ENCRYPTION_IV, "hex");

if (key.length !== 32) {
	throw new Error("Invalid encryption key length. Key must be 32 bytes.");
}

if (iv.length !== 16) {
	throw new Error("Invalid encryption IV length. IV must be 16 bytes.");
}

const encrypt = (payload: string): string => {
	const cipher = crypto.createCipheriv(algorithm, key, iv);
	let encrypted = cipher.update(payload, "utf8", "hex");
	encrypted += cipher.final("hex");
	return encrypted;
};

const decrypt = (encryptedPayload: string): string => {
	const decipher = createDecipheriv(algorithm, key, iv);
	let decrypted = decipher.update(encryptedPayload, "hex", "utf8");
	decrypted += decipher.final("utf8");
	return decrypted;
};

const aesCipherService = {encrypt, decrypt};
export default aesCipherService;
