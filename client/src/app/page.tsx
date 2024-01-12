import {requestProjects} from "#src/api";
import {headers} from "next/headers";
import {logOut} from "./actions";

const fetchProjects = async () => {
	const authorization = headers().get("authorization")!;
	const {data} = await requestProjects(authorization);
	return data;
};

const Home = async () => {
	const projects = await fetchProjects();

	return (
		<main>
			<div>Hello World!</div>
			<div>
				{projects.map(project => (
					<div key={project.id}>{project.title}</div>
				))}
			</div>
			<form action={logOut}>
				<button type="submit">Log out</button>
			</form>
		</main>
	);
};

export default Home;
