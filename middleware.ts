import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axiosInstance from "./client_actions/utils/axiosInstance";


type responseType = { message: "not logged in" | "logged in" };

export async function middleware(request: NextRequest) {
	console.log("im running");
	const cookieHeader = request.headers.get("cookie");

	const { data }: { data: responseType } = await axiosInstance.get(
		"/checksignedin",
		{
			headers: {
				Cookie: cookieHeader || "",
			},
		}
	);

	console.log(data.message);
	if (data.message === "not logged in") {
		return NextResponse.json({ message: "not authorized" }, { status: 403 });
	} else {
		return NextResponse.next();
	}
}

export const config = {
	matcher: "/api/generatestoryboard/:path*",
};
