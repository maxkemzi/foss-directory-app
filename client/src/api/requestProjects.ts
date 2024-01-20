import {Project} from "./types";
import fetchApi from "./fetchApi";

type Response = Project[];

const requestProjects = () => fetchApi<Response>("/projects");

export default requestProjects;
