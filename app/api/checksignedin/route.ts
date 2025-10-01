import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/server_actions/utils/sessions/session";

export async function GET() {
	try {
		const cook = (await cookies()).get("access_token");
		if (!cook) {
			return NextResponse.json(
				{ message: "not logged in" },
				{ status: 401 }
			);
		} else {
			const isValid = await decrypt(cook?.value);
			if (isValid) {
				return NextResponse.json({ message: "logged in" });
			} else {
				return NextResponse.json(
					{ message: "not logged in" },
					{ status: 401 }
				);
			}
		}
	} catch (err: any) {
		console.error("Error in /api/checksignedin:", err);
		return NextResponse.json(
			{ message: "error", error: err?.message ?? String(err) },
			{ status: 500 }
		);
	}
}
