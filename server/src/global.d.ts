import {ExtendedUserDto, GithubConnectionDto} from "#src/services";

declare module "express" {
	interface Response {
		locals: {
			user?: ExtendedUserDto | null;
			githubConnection?: GithubConnectionDto;
		};
	}
}
