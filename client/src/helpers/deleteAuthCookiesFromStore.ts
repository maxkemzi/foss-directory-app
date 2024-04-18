import {Cookie} from "#src/constants";
import {ReadonlyRequestCookies} from "next/dist/server/web/spec-extension/adapters/request-cookies";

const deleteAuthCookiesFromStore = (store: ReadonlyRequestCookies) => {
	store.delete(Cookie.USER);
	store.delete(Cookie.ACCESS_TOKEN);
	store.delete(Cookie.REFRESH_TOKEN);
};

export default deleteAuthCookiesFromStore;
