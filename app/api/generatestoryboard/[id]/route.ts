import { NextRequest, NextResponse } from "next/server";
import {
	createProject,
	addToInProgress,
	checkInProgress,
	checkUserOwnsProject,
} from "@/server_actions/database/databaseActions/databaseActions";
import { cookies } from "next/headers";
import { decrypt } from "@/server_actions/utils/sessions/session";
import { addNewUserProject } from "@/server_actions/database/databaseActions/databaseActions";
import generateSceneText from "@/server_actions/ai/gemini/sceneTextGeneration";
import { getProjectSceneInfo } from "@/server_actions/database/databaseActions/databaseActions";

type storyPromptType = {
	storyboardType: "black and white";
	sceneNumber: number;
	prompt: string;
	artStyle: "line drawn";
};

export async function POST(request: NextRequest) {
	try {
		const cook = (await cookies()).get("access_token");
		const cookieInfo = await decrypt(cook?.value);
		const userId = cookieInfo?.email;

		const data = await request.json();
		const projectId = await createProject(data);

		await addNewUserProject(userId, projectId);
		await addToInProgress(projectId);

		// run in background but catch internal errors
		generateSceneText(
			data.prompt,
			data.sceneNumber,
			data.artStyle,
			data.storyboardType,
			projectId
		).catch((e) => {
			console.error("Error generating scenes for project", projectId, e);
		});

		return NextResponse.json({ id: projectId });
	} catch (err: any) {
		console.error("Error in /api/generatestoryboard POST:", err);
		return NextResponse.json(
			{ message: "error", error: err?.message ?? String(err) },
			{ status: 500 }
		);
	}
}

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const cook = (await cookies()).get("access_token");
		const cookieInfo = await decrypt(cook?.value);
		const hasPermission = await checkUserOwnsProject(cookieInfo?.email, id);
		console.log("has permission", hasPermission);

		if (hasPermission) {
			const isFinished = await checkInProgress(id);

			if (!isFinished) {
				return NextResponse.json({ status: "incomplete", numProg: 50 });
			} else {
				const data = await getProjectSceneInfo(id);
				return NextResponse.json({
					status: "complete",
					numProg: 50,
					data: data,
				});
			}
		} else {
			return NextResponse.json({ status: "error" }, { status: 403 });
		}
	} catch (err: any) {
		console.error("Error in /api/generatestoryboard GET:", err);
		return NextResponse.json(
			{ message: "error", error: err?.message ?? String(err) },
			{ status: 500 }
		);
	}
}
