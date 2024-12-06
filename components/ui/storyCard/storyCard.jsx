import Image from "next/image";

export default function StoryCard() {
    return (
        <div className="border w-full h-80 hover:cursor-pointer dark:bg-border rounded-lg">
            <div className="relative h-4/6">
                <Image
                    src="/images/test/1.webp"
                    layout="fill"
                    objectFit="cover" 
                    alt="image"
                />
            </div>
            <div className="h-2/6 p-2 flex flex-col  mt-2 relative">
                <div className="font-bold">Storyboard 1</div>
                <div className="text-sm absolute bottom-4">Created Nov 23, 2024</div>
            </div>
        </div>
    );
}
