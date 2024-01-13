import {requestGithubConnect} from "#src/api";
import {Route} from "#src/constants";
import {NextRequest, NextResponse} from "next/server";

const GET = async (req: NextRequest) => {
	const searchParams = req.nextUrl.searchParams;
	const code = searchParams.get("code");
	if (!code) {
		return;
	}

	const authorization = req.headers.get("authorization")!;
	if (!authorization) {
		return;
	}

	try {
		await requestGithubConnect({code}, authorization);
		return NextResponse.redirect(new URL(Route.HOME, req.url));
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{error: "Error connecting github account."},
			{status: 404}
		);
	}
};

export {GET};
