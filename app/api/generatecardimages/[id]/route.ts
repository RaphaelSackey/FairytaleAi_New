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
	const data = await request.json();
	const { id } = await params;

	const cook = (await cookies()).get("access_token");
	const cookieInfo = await decrypt(cook?.value);
	const hasPermission = await checkUserOwnsProject(cookieInfo?.email, id);
	// console.log('has permission', hasPermission)

	if (hasPermission) {

		const urls = await Promise.all(data[0].scenes.map(async (scene: any) => {
			console.log(scene.description)
			console.log(' ')
		    const imageUrl = await generateImage(scene.description) as string
		    const downloadableUrl = await insertImageIntoDatabase (imageUrl)
		    return downloadableUrl

		}))

		await addImageLinksToUserProject(urls, id);

		return NextResponse.json({
			status: "complete",
			numProg: 100,
			data: urls,
		});
	} else {
		return NextResponse.json({ status: "error", numProg: 100, data: [] });
	}
}
