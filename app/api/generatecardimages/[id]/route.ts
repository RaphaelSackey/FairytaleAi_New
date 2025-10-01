import { NextRequest, NextResponse } from "next/server";
import generateImage from "@/server_actions/ai/dalle/imageGeneration";
import { cookies } from "next/headers";
import { decrypt } from "@/server_actions/utils/sessions/session";
import {
	addImageLinksToUserProject,
	checkUserOwnsProject,
} from "@/server_actions/database/databaseActions/databaseActions";
import { insertImageIntoDatabase } from "@/server_actions/database/imageActions/imageStorageActions";

export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const data = await request.json();
		const { id } = await params;

		const cook = (await cookies()).get("access_token");
		const cookieInfo = await decrypt(cook?.value);
		const hasPermission = await checkUserOwnsProject(cookieInfo?.email, id);

		if (!hasPermission) {
			return NextResponse.json(
				{ status: "error", numProg: 100, data: [] },
				{ status: 403 }
			);
		}

		const urls = await Promise.all(
			data[0].scenes.map(async (scene: any) => {
				try {
					console.log(scene.description);
					console.log(" ");
					const imageUrl = (await generateImage(
						scene.description
					)) as string;
					const downloadableUrl = await insertImageIntoDatabase(
						imageUrl
					);
					return downloadableUrl;
				} catch (innerErr: any) {
					console.error(
						"Error generating image for scene:",
						innerErr
					);
					return "";
				}
			})
		);

		await addImageLinksToUserProject(urls, id);

		return NextResponse.json({
			status: "complete",
			numProg: 100,
			data: urls,
		});
	} catch (err: any) {
		console.error("Error in /api/generatecardimages POST:", err);
		return NextResponse.json(
			{ message: "error", error: err?.message ?? String(err) },
			{ status: 500 }
		);
	}
}
