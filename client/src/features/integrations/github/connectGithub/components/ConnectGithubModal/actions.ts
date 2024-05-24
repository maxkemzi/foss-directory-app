"use server";

import {getGithubConnectionUrl} from "../../actions";
import {FormState, INITIAL_FORM_STATE} from "./constants";

const getGithubConnectionUrlWithState = async (prevState: FormState) => {
	try {
		const url = await getGithubConnectionUrl();
		return {
			...INITIAL_FORM_STATE,
			triggerStatusHandler: prevState.triggerStatusHandler,
			url
		};
	} catch (e) {
		return {
			...INITIAL_FORM_STATE,
			triggerStatusHandler: prevState.error
				? !prevState.triggerStatusHandler
				: prevState.triggerStatusHandler,
			error: "Error connecting github account"
		};
	}
};

export {getGithubConnectionUrlWithState};
