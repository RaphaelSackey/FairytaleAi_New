"use client";
import { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import SceneCard from "./sceneCard";
import getData from "@/client_actions/getStoryboardProgress";

type cardDataType = {
	id: number;
	description: string;
	dialog: string;
	action: string;
	position: number;
};

type requestStateType = "complete" | "incomplete" | "error";

export default function DragAndDropWrapper() {
	const [data, setData] = useState([
		{ id: 1 },
		{ id: 2 },
		{ id: 3 },
		{ id: 4 },
		{ id: 5 },
		{ id: 6 },
	]);
	const [requestState, setRequestState] =
		useState<requestStateType>("complete");
	const [progress, setProgress] = useState(0);
	const [mounted, setMounted] = useState(false);
	const [cardData, setCardData] = useState<cardDataType[] | null>(null);

	const cards = data.map((item) => (
		<SceneCard
			id={item.id}
			key={item.id}
		/>
	));
	// temp id need to be passed down from parent as a prop
	const id = 10;

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

	useEffect(() => setMounted(true));

	useEffect(() => {
		const intervalId = setInterval(async () => {
			if (requestState === "incomplete") {
				const data = await getData(id);

				if (data.status == "complete") {
					clearInterval(intervalId);
					setRequestState("complete");
					setProgress(data.numProg);
					setCardData(data.data);
				} else if (data.status === "error") {
					console.log("there was an error");
					setRequestState("error");
					setProgress(data.numProg);
					clearInterval(intervalId);
				} else if (data.status === "incomplete") {
					setProgress(data.numProg);
				}
			}
		}, 2000);

		return () => clearInterval(intervalId);
	}, []);

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
