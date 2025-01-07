import { getProjectSceneInfo } from "@/server_actions/database/databaseActions/databaseActions";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }>} ){
    const { id } = await params;
    const data = await getProjectSceneInfo(id)

    return NextResponse.json(data)
}