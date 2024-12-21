"use client";
import { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import SceneCard from "./sceneCard";
import getData from "@/client_actions/getStoryboardProgress";
import { Progress } from "../progress/progress";
import { dataType as sceneDataType } from "@/client_actions/getStoryboardProgress";

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
            link={undefined}
            description={item.description}
            dialog={undefined}
            action={undefined}
        />
    ));

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
