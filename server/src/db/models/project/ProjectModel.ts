import Db from "../../Db";
import {Project, ProjectPayload} from "./types";

class ProjectModel {
	static async create({
		title,
		description,
		contributors_needed,
		last_updated
	}: ProjectPayload): Promise<Project> {
		const {rows} = await Db.query<Project>(
			"INSERT INTO projects(title, description, contributors_needed, last_updated) VALUES($1, $2, $3, $4) RETURNING *;",
			[title, description, contributors_needed, last_updated]
		);
		return rows[0];
	}

	static async find() {
		const {rows} = await Db.query<Project>("SELECT * FROM projects;");
		return rows;
	}

	static async findById(id: Project["id"]) {
		const {rows} = await Db.query<Project>(
			"SELECT * FROM projects WHERE id=$1;",
			[id]
		);
		return rows[0];
	}

	static async deleteById(id: Project["id"]) {
		await Db.query<Project>("DELETE FROM projects WHERE id=$1;", [id]);
	}
}

export default ProjectModel;
