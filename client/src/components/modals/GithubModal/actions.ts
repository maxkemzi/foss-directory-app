"use server";

import {requestGithubConnect} from "#src/api";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const connectGithub = async () => {
	let url = null;

	try {
		const accessToken = cookies().get("accessToken")?.value;
		if (!accessToken) {
			throw new Error();
		}

		url = await requestGithubConnect();
	} catch (e) {
		console.log(e);
	}

	if (url) {
		redirect(url);
	}
};

export {connectGithub};
