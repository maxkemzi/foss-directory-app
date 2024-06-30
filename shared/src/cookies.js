const ApiCookie = {
	SESSION: {
		name: "session",
		options: {
			maxAge: 60 * 30, // 30 minutes
			httpOnly: true,
			sameSite: "lax"
		}
	},
	REFRESH_TOKEN: {
		name: "refreshToken",
		options: {
			maxAge: 60 * 60 * 24 * 30, // 30 days
			httpOnly: true,
			sameSite: "lax"
		}
	}
};

module.exports = {ApiCookie};
