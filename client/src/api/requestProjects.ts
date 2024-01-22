import fetchApiWithAuth from "./fetchApiWithAuth";
import {Project} from "./types";

type Response = Project[];

const requestProjects = async (): Promise<Response> => {
	const response = await fetchApiWithAuth("/projects");
	return response.json();
};

export default requestProjects;
