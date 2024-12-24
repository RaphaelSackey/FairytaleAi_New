import { NextRequest, NextResponse } from "next/server";
import generateImage from "@/server_actions/ai/dalle/imageGeneration"; 
import { cookies } from "next/headers";
import { decrypt } from "@/server_actions/utils/sessions/session";
import { addImageLinksToUserProject, checkUserOwnsProject } from "@/server_actions/database/databaseActions/databaseActions";
import { insertImageIntoDatabase } from "@/server_actions/database/imageActions/imageStorageActions";


export async function POST(request: NextRequest, {params}: {params: Promise<{ id: string }>}){
    const data = await request.json()
    const {id} = await params
    // const imageUrl = 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-uJYb964o3WKlGfxddWRK62Zg/user-UVDdtF3SfHTE1Jr3k7rFRznD/img-9iL9vIV957abYhdPneemtlig.png?st=2024-12-24T05%3A18%3A48Z&se=2024-12-24T07%3A18%3A48Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-12-23T19%3A58%3A42Z&ske=2024-12-24T19%3A58%3A42Z&sks=b&skv=2024-08-04&sig=f2qHEZUYXBtgKwb0hlhybucK9xMzoIsUaUHEGixPZNo%3D'
    // // const downloadableUrl = await insertImageIntoDatabase (imageUrl)
    // // console.log('downloadableUrl', downloadableUrl)

    // return NextResponse.json({status: 'complete', numProg: 100, data: []})

    const cook = (await cookies()).get("access_token");
    const cookieInfo = await decrypt(cook?.value)
    const hasPermission = await checkUserOwnsProject(cookieInfo?.email, id)
    // console.log('has permission', hasPermission)
    
    
    if (hasPermission){
        const urls = await Promise.all(data[0].scenes.map(async (scene: any) => {
            const imageUrl = await generateImage(scene, data[0].style) as string
            const downloadableUrl = await insertImageIntoDatabase (imageUrl)
            return downloadableUrl

        }))
        

        console.log('urls', urls)

        // await addImageLinksToUserProject(urls, id)
        
        return NextResponse.json({status: 'complete', numProg: 100, data: urls})

}else{
    return NextResponse.json({status: 'error', numProg: 100, data: []})
}
}