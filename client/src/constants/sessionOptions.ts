const SessionOption: {
	HTTP_ONLY: boolean;
	MAX_AGE: number;
	IS_SECURE: boolean;
	SAME_SITE: boolean | "lax" | "strict" | "none";
} = {
	HTTP_ONLY: true,
	MAX_AGE: 30 * 24 * 60 * 60,
	IS_SECURE: process.env.CLIENT_URL
		? process.env.CLIENT_URL.startsWith("https://")
		: false,
	SAME_SITE: "lax"
};

export default SessionOption;
