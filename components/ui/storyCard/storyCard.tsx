import Image from "next/image";
import { redirect } from 'next/navigation'

export default function StoryCard({img, id, date, num}: {img: string, id: string, date:string, num:number}) {
    return (
        <div className="border w-full h-fit hover:cursor-pointer dark:bg-border rounded-lg">
            <div className="relative w-full aspect-square " onClick={() => redirect(`storyboard/${id}`)}>
                <Image
                    src={img}
                    layout="fill"
                    objectFit="cover" 
                    alt="image"
                    className="rounded-t-lg"
                />
            </div>
            <div className="h-2/6 p-2 flex flex-col  mt-2 relative">
                <div className="font-bold font-suseMedium text-xl border-b border-gray-500">{num} {num > 1? 'Images': 'Image'}</div>
                <div className="text-sm mt-4">{date}</div>
            </div>
        </div>
    );
}
