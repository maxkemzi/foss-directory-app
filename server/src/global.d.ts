import {GithubConnectionDto, ExtendedUserDto} from "#src/dtos";
import "express";

declare module "express" {
	export interface Response {
		locals: {user?: ExtendedUserDto; githubConnection?: GithubConnectionDto};
	}
}
