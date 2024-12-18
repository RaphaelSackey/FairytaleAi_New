import DragAndDropWrapper from "@/components/ui/moveables/dragAndDropWrapper";
import Image from "next/image";
import { Progress } from "@/components/ui/progress/progress";

export default async function Storyboard({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const id = (await params).id;

	return (
		<div className=' container mx-auto flex flex-col items-center justify-center'>
			<div className='flex justify-end w-full mb-5 gap-2'>
				<button className='w-fit h-11 rounded-lg bg-gradient-to-r from-orange-500  to-varCallToAction flex items-center justify-center px-2 hover:scale-105 ease-in-out transition-transform '>
					Generate Images{" "}
					<Image
						src='/assets/ai.png'
						height={40}
						width={40}
						alt='ai'
					/>
				</button>
				<button className='w-36 h-11 border rounded-lg'>
					Download
				</button>
			</div>
			<DragAndDropWrapper id = {id}/>
		</div>
	);
}
