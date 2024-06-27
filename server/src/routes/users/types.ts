import {RequestHandler} from "express";

type DeleteAccountRequestHandler = RequestHandler<{}, {success: true}, {}, {}>;

export type {DeleteAccountRequestHandler};
