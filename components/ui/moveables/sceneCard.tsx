import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

export default function SceneCard({
	id,
	link,
	description,
	dialog,
	action,
}: {
	id: number;
	link: string | undefined;
	description: string | undefined;
	dialog: string | undefined;
	action: string | undefined;
}) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			className=' h-96 w-full rounded-t-lg'
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			style={style}>
			<div className='h-4/6 relative rounded-t-lg'>
				<Image
					src= {link? link :'/assets/image.webp'}
					objectFit='fill'
					fill
					alt=''
					className='rounded-t-lg'
				/>
			</div>
			<div className=' h-2/6 flex flex-col bg-border mt-2 rounded-lg px-1'>
				<div className='h-2/3 flex items-center border-b border-white dark:border-opacity-30 gap-2'>
					<Image
						src='/assets/writing.png'
						width={20}
						height={20}
						alt='script'
						className='dark:invert'
					/>
					<div className=" h-full overflow-scroll">{description? description : 'description'}</div>
				</div>
				<div className='h-1/3 flex items-center dark:border-opacity-30 gap-2'>
					<Image
						src='/assets/speaker.png'
						width={20}
						height={20}
						alt='script'
						className='dark:invert'
					/>
					{dialog? dialog : 'dialog'}
				</div>
				{/* <div className='h-1/3 flex items-center gap-2'>
					<Image
						src='/assets/action.png'
						width={20}
						height={20}
						alt='script'
						className='dark:invert'
					/>
					{action? action: 'action'}
				</div> */}
			</div>
		</div>
	);
}
