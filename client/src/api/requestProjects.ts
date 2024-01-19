import {Project} from "./types";
import fetchApi from "./fetchApi";

type Response = Project[];

const requestProjects = () => {
	return fetchApi<Response>("/projects");
};

export default requestProjects;
