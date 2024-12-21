import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
// import { SessionPayload } from "@/app/lib/definitions";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(payload: any) {
	
	
	const session = await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("15m")
		.sign(encodedKey);
	// const response = NextResponse.json({ message: 'success' }); 
	// response.cookies.set("session", session, {
	// 	httpOnly: true,
	// 	secure: true,
	// 	expires: expiresAt,
	// 	sameSite: "lax",
	// 	path: "/",
	// });

	return session
}

export async function decrypt(session: string | undefined = "") {
	try {
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ["HS256"],
		});
		return payload;
	} catch (error) {
		console.log("Failed to verify session");
	}
}