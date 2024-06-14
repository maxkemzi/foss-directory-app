import {PoolClient, QueryResult} from "pg";
import Document from "../../lib/Document";
import {
	PopulatableDocument,
	PopulatedProjectDocument,
	ProjectDocument as ProjectDocumentType
} from "../../types/documents";
import {
	ProjectFromDb,
	RoleFromDb,
	TagFromDb,
	UserFromDb
} from "../../types/rows";
import RoleDocument from "../role/RoleDocument";
import TagDocument from "../tag/TagDocument";
import UserDocument from "../user/UserDocument";

class ProjectDocument
	extends Document<ProjectDocumentType>
	implements PopulatableDocument<PopulatedProjectDocument>
{
	ownerUserId: ProjectDocumentType["ownerUserId"];
	name: ProjectDocumentType["name"];
	description: ProjectDocumentType["description"];
	repoUrl: ProjectDocumentType["repoUrl"];

	constructor(obj: ProjectFromDb) {
		super(obj);
		this.ownerUserId = obj.owner_user_account_id;
		this.name = obj.name;
		this.description = obj.description;
		this.repoUrl = obj.repo_url;
	}

	toObject(): ProjectDocumentType {
		return {
			...super.toObject(),
			ownerUserId: this.ownerUserId,
			name: this.name,
			description: this.description,
			repoUrl: this.repoUrl
		};
	}

	async populate(client: PoolClient): Promise<PopulatedProjectDocument> {
		const {id, ownerUserId} = this;

		const queries: Promise<QueryResult>[] = [
			client.query<UserFromDb>("SELECT * FROM user_account WHERE id=$1;", [
				ownerUserId
			]),
			client.query<TagFromDb>(
				`
				SELECT *
				FROM (
					SELECT pt.id, t.name, pt.created_at, pt.updated_at
					FROM project_tags pt
					JOIN tag t ON pt.tag_id = t.id
					WHERE pt.project_id = $1
					UNION ALL
					SELECT id, name, created_at, updated_at
					FROM project_tags
					WHERE project_id = $1 AND tag_id IS NULL
				) ORDER BY created_at;
				`,
				[id]
			),
			client.query<RoleFromDb & {places_available: number}>(
				`
				SELECT *
				FROM (
					SELECT pr.id, r.name, pr.places_available, pr.created_at, pr.updated_at
					FROM project_roles pr
					JOIN role r ON pr.role_id = r.id
					WHERE pr.project_id = $1 AND pr.places_available > 0
					UNION ALL
					SELECT id, name, places_available, created_at, updated_at
					FROM project_roles
					WHERE project_id = $1 AND role_id IS NULL AND places_available > 0
				) ORDER BY created_at;
				`,
				[id]
			)
		];

		const [ownerResult, tagsResult, rolesResult] = await Promise.all(queries);

		return {
			...this.toObject(),
			ownerUser: new UserDocument(ownerResult.rows[0]).toObject(),
			tags: tagsResult.rows.map(t => new TagDocument(t).toObject()),
			roles: rolesResult.rows.map(r => ({
				...new RoleDocument(r).toObject(),
				placesAvailable: r.places_available
			}))
		};
	}
}

export default ProjectDocument;
