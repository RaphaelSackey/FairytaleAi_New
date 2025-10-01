import { NextResponse } from "next/server";
import { addUser } from "../../../server_actions/database/databaseActions/databaseActions";
import {
	createSession,
	decrypt,
} from "@/server_actions/utils/sessions/session";
import { cookies } from "next/headers";

type responseType = {
	message: string;
};
export async function POST(request: Request) {
	try {
		const data = await request.json();
		const results: responseType = await addUser(data);
		const response = NextResponse.json(results);

		if (results.message == "success") {
			const session = await createSession({ email: data.email });
			const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
			response.cookies.set("access_token", session, {
				httpOnly: true,
				secure: true,
				expires: expiresAt,
				sameSite: "lax",
				path: "/",
			});
		}
		const cook = (await cookies()).get("access_token");
		console.log(await decrypt(cook?.value));
		return response;
	} catch (err: any) {
		console.error("Error in /api/signup:", err);
		return NextResponse.json(
			{ message: "error", error: err?.message ?? String(err) },
			{ status: 500 }
		);
	}
}
