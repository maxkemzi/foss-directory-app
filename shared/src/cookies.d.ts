export const ApiCookie: {
	SESSION: {
		name: string,
		options: {
			maxAge: number;
			httpOnly: boolean;
			sameSite: "lax";
		}
	},
	REFRESH_TOKEN: {
		name: string;
		options: {
			maxAge: number;
			httpOnly: boolean;
			sameSite: "lax";
		}
	}
};
