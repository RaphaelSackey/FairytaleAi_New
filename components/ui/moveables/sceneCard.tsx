"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { useState } from "react";

export default function SceneCard({
	id,
	link,
	description,
	handleSaveEdit,
	downloadMode,
}: {
	id: number;
	link: string | undefined;
	description: string | undefined;
	handleSaveEdit: (description: string, id: number) => void;
	downloadMode: boolean
}) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};
	const [isEditing, setIsEditing] = useState(false);
	const [editedDescription, setEditedDescription] = useState<string | "">(
		description || ""
	);

	return (
		<div
			className='w-full max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg hover:cursor-finger'
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			style={style}>
			<div className='relative w-full aspect-square bg-gray-200'>
				<Image
					src={link ? link : "/assets/image.webp"}
					alt=''
					fill
					objectFit='cover'
					className='rounded-t-lg'
				/>
			</div>
			<div className='bg-border h-auto pb-2'>
				{!link && <div className='flex mb-2 gap-2 max-h-28 '>
					<div className= "flex w-fit items-center justify-center">
						{!isEditing && <Image
							src='/assets/writing.png'
							width={20}
							height={20}
							alt='description icon'
							className='dark:invert sticky w-6 h-6'
						/>}
					</div>
					<div className="w-full">
						{!isEditing ? (
							<p className='text-sm text-gray-700 dark:text-gray-300 overflow-scroll w-auto max-h-28'>
								{description || "Description"}
							</p>
						) : (
							<textarea
								className='w-full h-28  p-2 text-sm text-gray-700 dark:text-gray-300'
								defaultValue={editedDescription}
								onPointerDown={(e) => e.stopPropagation()}
								onKeyDown={(e) => e.stopPropagation()}
								onChange={(e) => setEditedDescription(e.target.value)}
							></textarea>
						)}
					</div>
				</div>}
				
				{/* button section */}
				{!downloadMode && <div className='flex gap-2 h-auto pt-2'>
					{link ? (
						<>
							<button className='bg-gradient-to-r from-green-400 to-green-600 px-2 py-1 rounded hover:from-green-500 hover:to-green-700 transition-colors duration-300'>
								Regenerate
							</button>
							<a
								href={link}
								className='bg-gradient-to-r from-blue-400 to-blue-600 px-1 py-1 rounded hover:from-blue-500 hover:to-blue-700 transition-colors duration-300'
								target='_blank'
								rel='noopener noreferrer'>
								Full Image
							</a>
						</>
					) : !isEditing ? (
						<button
							className='w-full bg-gradient-to-r from-blue-400 to-blue-600 px-1 py-1 rounded hover:from-blue-500 hover:to-blue-700 transition-colors duration-300'
							onDoubleClick={(e) => {
								e.stopPropagation();
								setIsEditing(true);
							}}>
							Edit description
						</button>
					) : (
						<button
							className='w-full bg-gradient-to-r from-blue-400 to-blue-600 px-1 py-1 rounded hover:from-blue-500 hover:to-blue-700 transition-colors duration-300'
							onDoubleClick={(e) => {
								e.stopPropagation();
								setIsEditing(false);
								handleSaveEdit(editedDescription, id);
							}}>
							Save Edits
						</button>
					)}
				</div>}
			</div>
		</div>
	);
}