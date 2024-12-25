import { NextRequest, NextResponse } from 'next/server';
import { getProjectImageLinks } from '@/server_actions/database/databaseActions/databaseActions';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }>} ) {
    const { id } = await params;
    const imageLink = await getProjectImageLinks(id);

    if (imageLink) {
        return NextResponse.json({ hasImages: true, images: imageLink});
    }else{
        return NextResponse.json({ status: false , images: [] });
    }
    

}