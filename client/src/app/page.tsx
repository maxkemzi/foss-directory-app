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
			<a
				href={`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`}
				target="_blank"
			>
				Connect GitHub
			</a>
		</main>
	);
};

export default Home;
