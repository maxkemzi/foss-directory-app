import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
const CSRF_SECRET = process.env.JWT_CSRF_SECRET as string;

const generateAccessToken = (payload: string | object) => {
	return jwt.sign(payload, ACCESS_SECRET, {
		expiresIn: "30m"
	});
};

const generateRefreshToken = (payload: string | object) => {
	return jwt.sign(payload, REFRESH_SECRET, {
		expiresIn: "30d"
	});
};

const generateAccessAndRefreshTokens = (payload: string | object) => {
	return {
		access: generateAccessToken(payload),
		refresh: generateRefreshToken(payload)
	};
};

const generateCsrfToken = (payload: string | object) => {
	return jwt.sign(payload, CSRF_SECRET, {
		expiresIn: "10m"
	});
};

const verifyToken = <T>(token: string, secret: string) => {
	try {
		const payload = jwt.verify(token, secret) as T;
		return payload;
	} catch (e) {
		return null;
	}
};

const verifyAccessToken = <T>(token: string) => {
	return verifyToken<T>(token, ACCESS_SECRET);
};

const verifyRefreshToken = <T>(token: string) => {
	return verifyToken<T>(token, REFRESH_SECRET);
};

const verifyCsrfToken = <T>(token: string) => {
	return verifyToken<T>(token, CSRF_SECRET);
};

export default {
	generateAccessToken,
	generateAccessAndRefreshTokens,
	generateCsrfToken,
	verifyAccessToken,
	verifyRefreshToken,
	verifyCsrfToken
};
