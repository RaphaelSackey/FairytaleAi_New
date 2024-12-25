import { NextRequest, NextResponse } from "next/server";
import { createProject, addToInProgress, checkInProgress, checkUserOwnsProject } from "@/server_actions/database/databaseActions/databaseActions";
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

export async function POST(request: NextRequest){
    const cook = (await cookies()).get("access_token");
    const cookieInfo = await decrypt(cook?.value)
    const userId = cookieInfo?.email
    
    const data = await request.json()
    const projectId = await createProject(data)
    
    await addNewUserProject(userId  ,projectId)
    await addToInProgress(projectId)
    
    generateSceneText(data.prompt, data.sceneNumber, data.artStyle, data.storyboardType, projectId)
    // generateImages(projectId, sceneText)
    
    

    return NextResponse.json({id:projectId })
    
}

export async function GET(request: NextRequest, {params}: {params: Promise<{ id: string }>}){
    const {id} = await params
    const cook = (await cookies()).get("access_token");
    const cookieInfo = await decrypt(cook?.value)
    const hasPermission = await checkUserOwnsProject(cookieInfo?.email, id)
    console.log('has permission', hasPermission)

    if (hasPermission){
        const isFinished = await checkInProgress(id)

        if (!isFinished){
            return NextResponse.json({status: 'incomplete', numProg: 50})  
        }else{
            const data = await getProjectSceneInfo(id)
            return NextResponse.json({status: 'complete', numProg: 50, data: data})
        }
    }else{
        return NextResponse.json({status: 'error'})
    }
    
}