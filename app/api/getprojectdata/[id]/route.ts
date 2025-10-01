import { getProjectSceneInfo } from "@/server_actions/database/databaseActions/databaseActions";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const data = await getProjectSceneInfo(id);

		return NextResponse.json(data);
	} catch (err: any) {
		console.error("Error in /api/getprojectdata:", err);
		return NextResponse.json(
			{ message: "error", error: err?.message ?? String(err) },
			{ status: 500 }
		);
	}
}
