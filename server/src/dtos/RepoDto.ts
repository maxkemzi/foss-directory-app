class RepoDto {
	id: number;
	name: string;
	description: string;
	url: string;
	topics: string[];

	constructor(doc: any) {
		this.id = doc.id;
		this.name = doc.name;
		this.description = doc.description;
		this.url = doc.html_url;
		this.topics = doc.topics;
	}
}

export default RepoDto;
