import {ExtendedUserDto, GithubConnectionDto} from "#src/services";

declare module "express" {
	interface Response {
		locals: {user?: ExtendedUserDto; githubConnection?: GithubConnectionDto};
	}
}
