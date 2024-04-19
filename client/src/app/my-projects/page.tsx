import {ProjectsApi} from "#src/apis";
import {ProjectCard} from "#src/components";
import {Container} from "#src/components/ui";
import {Header} from "../(header)";

const MyProjects = async () => {
	const projects = await ProjectsApi.fetchAllAuth();

	return (
		<>
			<Header />
			<main>
				<section className="py-6">
					<Container>
						<div className="grid grid-cols-3 items-start gap-4">
							{projects.map(project => (
								<ProjectCard key={project.id} project={project} />
							))}
						</div>
					</Container>
				</section>
			</main>
		</>
	);
};

export default MyProjects;
