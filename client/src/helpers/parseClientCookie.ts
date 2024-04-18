import Cookies from "universal-cookie";

const parseClientCookie = <T>(name: string): T | undefined => {
	const cookies = new Cookies(null, {path: "/"});
	return cookies.get(name);
};

export default parseClientCookie;
