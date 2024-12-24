"use client";
import { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import SceneCard from "./sceneCard";
import getData from "@/client_actions/getStoryboardProgress";
import { Progress } from "../progress/progress";
import { dataType as sceneDataType } from "@/client_actions/getStoryboardProgress";
import Image from "next/image";
import generateCardImages from "@/client_actions/generateCardImages";

type requestStateType = "complete" | "incomplete" | "error";

export default function DragAndDropWrapper({ id }: { id: string }) {
    const [sortableItems, setSortableItems] = useState<number[]>([]);
    const [requestState, setRequestState] = useState<requestStateType>("incomplete");
    const [progress, setProgress] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [cardData, setCardData] = useState<sceneDataType | null>(null);
    const [sortedScenes, setSortedScenes] = useState<any[]>([]);

    useEffect(() => {
        if (cardData?.scenes?.[0]?.scenes) {
            const initialItems = cardData.scenes[0].scenes.map(item => Number(item.sceneNumber));
            setSortableItems(initialItems);
            setSortedScenes(cardData.scenes[0].scenes);
        }
    }, [cardData]);

    useEffect(() => {
        // Update sortedScenes based on sortableItems' new order
        if (cardData?.scenes?.[0]?.scenes) {
            const updatedScenes = sortableItems.map(itemId =>
                cardData.scenes[0].scenes.find(scene => Number(scene.sceneNumber) === itemId)
            );
            setSortedScenes(updatedScenes);
        }
    }, [sortableItems, cardData]);

    const cards = sortedScenes.map(item => (
        <SceneCard
            id={Number(item.sceneNumber)}
            key={Number(item.sceneNumber)}
            link={'https://firebasestorage.googleapis.com/v0/b/fairytaleai-caa77.firebasestorage.app/o/fairytaleAi%2Fhttps%3A%2Foaidalleapiprodscus.blob.core.windows.net%2Fprivate%2Forg-uJYb964o3WKlGfxddWRK62Zg%2Fuser-UVDdtF3SfHTE1Jr3k7rFRznD%2Fimg-7TV03EWQk1q1saq9rUsQffOQ.png%3Fst%3D2024-12-24T07%253A03%253A50Z%26se%3D2024-12-24T09%253A03%253A50Z%26sp%3Dr%26sv%3D2024-08-04%26sr%3Db%26rscd%3Dinline%26rsct%3Dimage%2Fpng%26skoid%3Dd505667d-d6c1-4a0a-bac7-5c84a87759f8%26sktid%3Da48cca56-e6da-484e-a814-9c849652bcb3%26skt%3D2024-12-23T20%253A36%253A20Z%26ske%3D2024-12-24T20%253A36%253A20Z%26sks%3Db%26skv%3D2024-08-04%26sig%3DsJ0sJLCx5IacoQYdh27mTpfE%252Bn7JSIOm%2FHpqzkvtpPc%253D?alt=media&token=a5f6e6f6-431c-49d6-8f2f-be197308af7c'}
            description={item.description}
            dialog={undefined}
            action={undefined}
        />
    ));

    async function generateImages() {
        // setRequestState("incomplete");
        const response = await generateCardImages(cardData?.scenes, id)
        // setRequestState("complete")
        console.log(response)
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over?.id !== active.id) {
            setSortableItems(prev => {
                const curPos = prev.findIndex(item => item === Number(active.id));
                const newPos = prev.findIndex(item => item === Number(over?.id));
                return arrayMove(prev, curPos, newPos);
            });
        }
    };

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            if (requestState === "incomplete") {
                try {
                    const data = await getData(id);

                    if (data.status === "complete") {
                        clearInterval(intervalId);
                        setRequestState("complete");
                        setProgress(data.numProg);
                        console.log("Data fetched successfully:", data.data);
                        setCardData(data.data);
                    } else if (data.status === "error") {
                        console.error("There was an error fetching data.");
                        setRequestState("error");
                        clearInterval(intervalId);
                    } else if (data.status === "incomplete") {
                        setProgress(data.numProg);
                    }
                } catch (error) {
                    console.error("Error during data fetch:", error);
                    setRequestState("error");
                    clearInterval(intervalId);
                }
            }
        }, 2000);

        return () => clearInterval(intervalId);
    }, [id, requestState]);

    return mounted ? (
        <DndContext onDragEnd={handleDragEnd}>
            <div className='flex justify-end w-full mb-5 gap-2'>
				<button className='w-fit h-11 rounded-lg bg-gradient-to-r from-orange-500  to-varCallToAction flex items-center justify-center px-2 hover:scale-105 ease-in-out transition-transform ' onClick={generateImages}>
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
            {requestState === "incomplete" && (
                <div className="w-full mb-5">
                    <Progress value={progress} />
                </div>
            )}
            <div
                className={
                    requestState === "complete" || requestState === "error"
                        ? "grid grid-cols-1 px-6 w-5/6 md:w-full md:px-0 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                        : "grid grid-cols-1 px-6 w-5/6 md:w-full md:px-0 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse"
                }
            >
                <SortableContext items={sortableItems}>{cards}</SortableContext>
            </div>
        </DndContext>
    ) : (
        <div></div>
    );
}
