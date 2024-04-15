import {AuthCookie} from "#src/constants";
import {ReadonlyRequestCookies} from "next/dist/server/web/spec-extension/adapters/request-cookies";

const deleteAuthCookiesFromStore = (store: ReadonlyRequestCookies) => {
	Object.values(AuthCookie).forEach(cookie => {
		store.delete(cookie);
	});
};

export default deleteAuthCookiesFromStore;
