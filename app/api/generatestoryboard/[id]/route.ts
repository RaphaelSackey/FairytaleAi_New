import { NextRequest, NextResponse } from "next/server";
import { createProject, addToInProgress, checkInProgress, checkUserOwnsProject } from "@/server_actions/database/databaseActions/databaseActions";
import { generateImages } from "@/server_actions/database/imageActions/generateImages";
import { cookies } from "next/headers";
import { decrypt } from "@/server_actions/utils/sessions/session";
import { addUserProject } from "@/server_actions/database/databaseActions/databaseActions";


export async function POST(request: NextRequest){
    const cook = (await cookies()).get("access_token");
    const cookieInfo = await decrypt(cook?.value)
    const userId = cookieInfo?.email
    
    const data = await request.json()
    const projectId = await createProject(data)
    
    await addUserProject(userId  ,projectId)
    generateImages(projectId, data)
    
    await addToInProgress(projectId)

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
            return NextResponse.json({status: 'complete', numProg: 50, data: ['a', 'b', 'c']})
        }
    }else{
        return NextResponse.json({status: 'error'})
    }
    
}