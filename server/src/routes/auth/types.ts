import {RequestHandler} from "express";

type SignUpRequestHandler = RequestHandler<
	{},
	{success: true},
	{username: string; email: string; password: string},
	{}
>;

type VerifyEmailRequestHandler = RequestHandler<
	{token: string},
	{success: true},
	{},
	{}
>;

type LogInRequestHandler = RequestHandler<
	{},
	{success: true},
	{email: string; password: string},
	{}
>;

type RefreshRequestHandler = RequestHandler<{}, {success: true}, {}, {}>;

type LogoutRequestHandler = RequestHandler<{}, {success: true}, {}, {}>;

export type {
	LogInRequestHandler,
	LogoutRequestHandler,
	RefreshRequestHandler,
	SignUpRequestHandler,
	VerifyEmailRequestHandler
};
