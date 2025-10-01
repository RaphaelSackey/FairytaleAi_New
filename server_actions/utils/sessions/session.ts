import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
// import { SessionPayload } from "@/app/lib/definitions";

const secretKey = process.env.SESSION_SECRET;
if (!secretKey) {
	console.error("SESSION_SECRET is not set");
	throw new Error("SESSION_SECRET environment variable is required");
}
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(payload: any) {
	try {
		const session = await new SignJWT(payload)
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime("15m")
			.sign(encodedKey);

		return session;
	} catch (err: any) {
		console.error("Error creating session:", err);
		throw err;
	}
}

export async function decrypt(session: string | undefined = "") {
	try {
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ["HS256"],
		});
		return payload;
	} catch (error: any) {
		console.error("Failed to verify session:", error);
		return null;
	}
}
