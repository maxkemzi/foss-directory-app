import "express";
import {UserDto} from "#src/dtos";

declare module "express" {
	export interface Response {
		locals: {user?: UserDto};
	}
}
