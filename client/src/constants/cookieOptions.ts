import {ResponseCookie} from "next/dist/compiled/@edge-runtime/cookies";

const COOKIE_OPTIONS: Partial<ResponseCookie> = {
	httpOnly: true,
	maxAge: 30 * 24 * 60 * 60 * 1000
};

export default COOKIE_OPTIONS;
