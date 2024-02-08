import {Db} from "#src/db";
import {CustomTagFromDb} from "../customTag/types";
import {TagFromDb} from "../tag/types";
import {UserFromDb} from "../user/types";
import {
	ProjectDocumentImpl,
	ProjectDocumentData,
	ProjectFromDb,
	PopulatedProjectDocumentData
} from "./types";

class ProjectDocument implements ProjectDocumentImpl {
	id: ProjectFromDb["id"];
	ownerId: ProjectFromDb["owner_id"];
	name: ProjectFromDb["name"];
	description: ProjectFromDb["description"];
	repoUrl: ProjectFromDb["repo_url"];
	createdAt: ProjectFromDb["created_at"];
	updatedAt: ProjectFromDb["updated_at"];

	constructor(model: ProjectFromDb) {
		this.id = model.id;
		this.ownerId = model.owner_id;
		this.name = model.name;
		this.description = model.description;
		this.repoUrl = model.repo_url;
		this.createdAt = model.created_at;
		this.updatedAt = model.updated_at;
	}

	async populate(): Promise<PopulatedProjectDocumentData> {
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
					"SELECT * FROM custom_tags WHERE project_id=$1;",
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

	toObject(): ProjectDocumentData {
		return {
			id: this.id,
			ownerId: this.ownerId,
			name: this.name,
			description: this.description,
			repoUrl: this.repoUrl,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt
		};
	}
}

export default ProjectDocument;
