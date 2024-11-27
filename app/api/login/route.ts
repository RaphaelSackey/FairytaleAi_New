import { hashPassword, verifyPassword } from "@/lib/hashPassword/encript";
import { createSession, decrypt } from "@/lib/sessions/session";
import { getUser } from "@/server_services/database/databaseActions/databaseActions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const data = await request.json();
	const userData = await getUser(data);

	if (!userData) {
		return NextResponse.json({ message: "not a user" });
	}else{
    
    const samePassword = await verifyPassword(data.password, userData.password)
	if (samePassword) {
		const session = await createSession({ email: data.email });
		
		const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
		const response = NextResponse.json({ message: "success" })
        response.cookies.set(
			"access_token",
			session,
			{
				httpOnly: true,
				secure: true,
				expires: expiresAt,
				sameSite: "lax",
				path: "/",
			}
		);

        console.log(response);
		return response
	
    } else {
		return NextResponse.json({ message: "incorrect password" });
	}
    }
	
}
