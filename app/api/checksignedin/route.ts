import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/server_actions/utils/sessions/session";

export async function GET() {
	const cook = (await cookies()).get("access_token");
	console.log(cook)
	if (!cook) {
		return NextResponse.json({ message: "not logged in" });
	} else {
		const isValid = await decrypt(cook?.value);
		if (isValid) {
			return NextResponse.json({ message: "logged in" });
		} else {
			return NextResponse.json({ message: "not logged in" });
		}
	}
}
