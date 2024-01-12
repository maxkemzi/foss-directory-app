import {Project} from "./types";
import fetchApi from "./fetchApi";

type Response = Project[];

const requestProjects = (authorization: string) => {
	return fetchApi<Response>("/projects", {
		headers: {authorization}
	});
};

export default requestProjects;
