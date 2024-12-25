import {
	hashPassword,
	verifyPassword,
} from "@/server_actions/utils/hashPassword/encript";
import {
	createSession,
	decrypt,
} from "@/server_actions/utils/sessions/session";
import { getUser } from "@/server_actions/database/databaseActions/databaseActions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const data = await request.json();
	const userData = await getUser(data);

	if (!userData) {
		return NextResponse.json({ message: "not a user" });
	} else {
		const samePassword = await verifyPassword(
			data.password,
			userData.password
		);
		if (samePassword) {
			const session = await createSession({ email: data.email });

			const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
			const response = NextResponse.json({ message: "success" });
			response.cookies.set("access_token", session, {
				httpOnly: true,
				secure: false,
				expires: expiresAt,
				sameSite: "lax",
				path: "/",
			});

			console.log(response);
			return response;
		} else {
			return NextResponse.json({ message: "incorrect password" });
		}
	}
}
