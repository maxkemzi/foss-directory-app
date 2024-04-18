import {Db} from "#src/db";
import {CustomTagFromDb} from "../../types/customTag/types";
import {PopulatedProject, Project, ProjectFromDb} from "../../types";
import {TagFromDb} from "../../types/tag/types";
import {UserFromDb} from "../../types/user/types";
import {DocumentImpl} from "../types";
import Document from "../Document";

class ProjectDocument extends Document implements DocumentImpl<Project> {
	ownerId: ProjectFromDb["owner_id"];
	name: ProjectFromDb["name"];
	description: ProjectFromDb["description"];
	repoUrl: ProjectFromDb["repo_url"];

	constructor(obj: ProjectFromDb) {
		super(obj);
		this.ownerId = obj.owner_id;
		this.name = obj.name;
		this.description = obj.description;
		this.repoUrl = obj.repo_url;
	}

	toObject(): Project {
		return {
			...super.toObject(),
			ownerId: this.ownerId,
			name: this.name,
			description: this.description,
			repoUrl: this.repoUrl
		};
	}

	async populate(): Promise<PopulatedProject> {
		const [{rows: users}, {rows: tags}, {rows: customTags}] = await Promise.all(
			[
				Db.query<UserFromDb>("SELECT * FROM users WHERE id=$1;", [
					this.ownerId
				]),
				Db.query<TagFromDb>(
					`
					SELECT * FROM tags
					JOIN projects_tags ON tags.id = projects_tags.tag_id
					WHERE projects_tags.project_id = $1;
				`,
					[this.id]
				),
				Db.query<CustomTagFromDb>(
					"SELECT * FROM projects_custom_tags WHERE project_id=$1;",
					[this.id]
				)
			]
		);
		const user = users[0];

		return {
			...this.toObject(),
			Owner: {
				id: user.id,
				username: user.username,
				email: user.email,
				password: user.password,
				githubIsConnected: user.github_connected,
				createdAt: user.created_at,
				updatedAt: user.updated_at
			},
			Tags: tags.map(t => ({
				id: t.id,
				name: t.name,
				createdAt: t.created_at,
				updatedAt: t.updated_at
			})),
			CustomTags: customTags.map(ct => ({
				id: ct.id,
				projectId: ct.project_id,
				name: ct.name,
				createdAt: ct.created_at,
				updatedAt: ct.updated_at
			}))
		};
	}
}

export default ProjectDocument;
