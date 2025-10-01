import { NextRequest, NextResponse } from "next/server";
import { getProjectImageLinks } from "@/server_actions/database/databaseActions/databaseActions";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const imageLink = await getProjectImageLinks(id);

		if (imageLink) {
			return NextResponse.json({ hasImages: true, images: imageLink });
		} else {
			return NextResponse.json({ status: false, images: [] });
		}
	} catch (err: any) {
		console.error("Error in /api/getprojectimages:", err);
		return NextResponse.json(
			{ message: "error", error: err?.message ?? String(err) },
			{ status: 500 }
		);
	}
}
