import { NextRequest, NextResponse } from "next/server";


export function POST(){
    
}

export async function GET(request: NextRequest, {params}: {params: Promise<{ id: string }>}){

    const {id} = await params
    console.log('idddddddd',id)
    return NextResponse.json({status: 'incomplete'})
}