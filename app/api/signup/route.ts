import { NextResponse } from "next/server";
import { addUser } from "../../../server_services/database/databaseActions/databaseActions";
import { createSession, decrypt } from "@/lib/sessions/session";
import { cookies } from "next/headers";

type responseType = {
	message: string;
};
export async function POST(request: Request) {
	const data = await request.json();
	const results: responseType = await addUser(data);
	const response = NextResponse.json(results);

	if (results.message == "success") {
		const session = await createSession({ email: data.email });
		const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
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
}
