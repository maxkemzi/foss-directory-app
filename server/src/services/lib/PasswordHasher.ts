import bcryptjs from "bcryptjs";

class PasswordHasher {
	static hash(password: string) {
		return bcryptjs.hash(password, 10);
	}

	static compare(password: string, hashedPassword: string) {
		return bcryptjs.compare(password, hashedPassword);
	}
}

export default PasswordHasher;
