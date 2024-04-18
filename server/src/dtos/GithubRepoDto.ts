import {GithubRepo} from "#src/types";

class GithubRepoDto {
	id: number;
	name: string;
	description: string | null;
	url: string;
	topics: string[];

	constructor(doc: GithubRepo) {
		this.id = doc.id;
		this.name = doc.name;
		this.description = doc.description;
		this.url = doc.html_url;
		this.topics = doc.topics;
	}
}

export default GithubRepoDto;
