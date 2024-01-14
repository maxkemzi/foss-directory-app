import {ApiError, requestGithubConnect} from "#src/api";
import {Route} from "#src/constants";
import {NextRequest, NextResponse} from "next/server";

const GET = async (req: NextRequest) => {
	const authorization = req.headers.get("authorization")!;
	if (!authorization) {
		return NextResponse.json({error: "Unauthorized"}, {status: 401});
	}

	const searchParams = req.nextUrl.searchParams;
	const code = searchParams.get("code");
	if (!code) {
		return NextResponse.json(
			{error: 'The "code" query parameter is missing.'},
			{status: 400}
		);
	}

	try {
		await requestGithubConnect({code}, authorization);
		return NextResponse.redirect(new URL(Route.HOME, req.url));
	} catch (e) {
		console.log(e);

		if (e instanceof ApiError) {
			return NextResponse.json({error: e.message}, {status: e.status});
		}

		return NextResponse.json(
			{error: "Error connecting github account."},
			{status: 404}
		);
	}
};

export {GET};
