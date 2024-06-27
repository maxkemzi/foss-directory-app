import {ExtendedUserDto} from "#src/services";
import {RequestHandler} from "express";

type ResponseBody = {
	user: ExtendedUserDto;
	tokens: {access: string; refresh: string};
};

type SignupRequestHandler = RequestHandler<
	{},
	ResponseBody,
	{username: string; email: string; password: string},
	{}
>;

type LoginRequestHandler = RequestHandler<
	{},
	ResponseBody,
	{email: string; password: string},
	{}
>;

type RefreshRequestHandler = RequestHandler<{}, ResponseBody, {}, {}>;

type LogoutRequestHandler = RequestHandler<{}, {success: true}, {}, {}>;

export type {
	LoginRequestHandler,
	LogoutRequestHandler,
	RefreshRequestHandler,
	SignupRequestHandler
};
