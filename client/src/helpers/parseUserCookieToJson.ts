import {UserFromApi} from "#src/types/api";

const parseUserCookieToJson = (cookie: string) =>
	JSON.parse(cookie) as UserFromApi;

export default parseUserCookieToJson;
