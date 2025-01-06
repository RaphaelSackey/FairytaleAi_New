import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/server_actions/utils/sessions/session";
import { getUser } from "@/server_actions/database/databaseActions/databaseActions";

type PayloadType = {
	email: string;
	iat: number;
	exp: number;
};

export async function GET() {
	const cook = (await cookies()).get("access_token");

	if (!cook) {
		return NextResponse.json(
			{ error: "No access token found" },
			{ status: 401 }
		);
	}

	const payload = (await decrypt(cook.value)) as PayloadType | null;
    const useData = await getUser(payload as PayloadType)
    console.log(useData)
	return NextResponse.json({firstName:useData?.firstName, lastName:useData?.lastNameName, projects:useData?.projects});
}
