import "express";
import {UserDto} from "./dtos";

declare module "express" {
	export interface Response {
		locals: {user?: UserDto};
	}
}
