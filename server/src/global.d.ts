import {GithubConnectionDto, UserDto} from "#src/dtos";
import "express";

declare module "express" {
	export interface Response {
		locals: {user?: UserDto; githubConnection?: GithubConnectionDto};
	}
}
