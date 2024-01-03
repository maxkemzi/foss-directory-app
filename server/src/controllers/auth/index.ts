import {Request, Response} from "express";
import Db from "../../db";

class AuthController {
	static async login(req: Request, res: Response) {
		const response = await Db.query("SELECT NOW();");
		res.json(response.rows[0]);
	}
}

export default AuthController;
