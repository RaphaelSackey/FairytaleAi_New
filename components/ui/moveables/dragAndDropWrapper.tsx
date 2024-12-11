"use client";
import { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext} from "@dnd-kit/sortable";
import SceneCard from "./sceneCard";

export default function DragAndDropWrapper() {
	const [data, setData] = useState([{ id: 1 }, { id: 2 }, { id: 3 },{ id: 4 }, { id: 5 },{ id: 6 } ]);
	const [mounted, setMounted] = useState(false);

	const cards = data.map((item) => <SceneCard id={item.id} key={item.id}/>);


	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (over?.id !== active.id) {
			setData((prev) => {
				const curPos = prev.findIndex((item) => item.id === active.id);
				const newPos = prev.findIndex((item) => item.id === over?.id);

				return arrayMove(prev, curPos, newPos);
			});
		}
	};


    useEffect(() => setMounted(true))
	return mounted ? (
		<DndContext onDragEnd={handleDragEnd}>
			<div className='grid grid-cols-1 px-6 w-5/6 md:w-full md:px-0 sm:grid-cols-2 lg:grid-cols-4 gap-4 '>
				<SortableContext items={data}>{cards}</SortableContext>
			</div>
		</DndContext>
	) : (
		<div></div>
	);
}
