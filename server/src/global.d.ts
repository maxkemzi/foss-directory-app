import {ExtendedUserDto, GithubConnectionDto} from "#src/services";
import "express";

declare module "express" {
	export interface Response {
		locals: {user?: ExtendedUserDto; githubConnection?: GithubConnectionDto};
	}
}
