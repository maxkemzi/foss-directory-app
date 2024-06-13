import {projectActions} from "#src/entities/project";
import {calcHasMore} from "#src/shared/apis";
import {
	PageContainer,
	PageContent,
	PageSection,
	PageTitle
} from "#src/shared/ui";
import List from "./List";

const Projects = async () => {
	const LIMIT = 6;
	const {data, page, totalPages} = await projectActions.getAll({limit: LIMIT});

	const hasMore = calcHasMore(page, totalPages);

	return (
		<PageSection>
			<PageContainer>
				<PageTitle>Projects</PageTitle>
				<PageContent>
					{data.length !== 0 ? (
						<List
							initialProjects={data}
							initialHasMore={hasMore}
							limit={LIMIT}
						/>
					) : (
						<p>There are no projects</p>
					)}
				</PageContent>
			</PageContainer>
		</PageSection>
	);
};

export default Projects;
