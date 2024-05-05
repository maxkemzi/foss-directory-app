import {ProjectsApi} from "#src/apis";
import {ProjectCard} from "#src/components";
import {Container} from "#src/components/ui";
import {Cookie} from "#src/constants";
import {UserFromApi} from "#src/types/apis";
import {cookies} from "next/headers";
import {Header} from "../(header)";

const Projects = async () => {
	const cookieStore = cookies();
	const userCookie = cookieStore.get(Cookie.USER)?.value;
	const user = userCookie ? (JSON.parse(userCookie) as UserFromApi) : null;

	const projects = await ProjectsApi.fetchAll();

	return (
		<>
			<Header />
			<main>
				<section className="py-6">
					<Container>
						<div className="grid grid-cols-3 items-start gap-4">
							{projects.map(project => (
								<ProjectCard
									key={project.id}
									requestable={user?.id ? user.id !== project.Owner.id : true}
									isAuth={user != null}
									project={project}
								/>
							))}
						</div>
					</Container>
				</section>
			</main>
		</>
	);
};

export default Projects;
