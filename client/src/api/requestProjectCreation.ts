import fetchApiWithAuth from "./fetchApiWithAuth";
import {Project} from "./types";

type Body = Pick<Project, "name" | "description" | "repoUrl"> & {
	tags: string[];
};

type Response = Project;

const requestProjectCreation = async (body: Body): Promise<Response> => {
	const response = await fetchApiWithAuth("/projects", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(body),
		cache: "no-store"
	});
	return response.json();
};

export default requestProjectCreation;
