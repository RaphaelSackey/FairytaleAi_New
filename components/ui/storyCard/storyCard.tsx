import Image from "next/image";
import { redirect } from 'next/navigation'

export default function StoryCard({img, id}: {img: string, id: string}) {
    return (
        <div className="border w-full h-72 hover:cursor-pointer dark:bg-border rounded-lg">
            <div className="relative h-4/6" onClick={() => redirect(`storyboard/${id}`)}>
                <Image
                    src={img}
                    layout="fill"
                    objectFit="cover" 
                    alt="image"
                    className="rounded-t-lg"
                />
            </div>
            <div className="h-2/6 p-2 flex flex-col  mt-2 relative">
                <div className="font-bold font-suseMedium text-xl border-b border-gray-500">Storyboard 1</div>
                <div className="text-sm mt-4">Created Nov 23, 2024</div>
            </div>
        </div>
    );
}
