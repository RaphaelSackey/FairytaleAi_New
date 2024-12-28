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
import { getProjectImages } from "@/client_actions/getProjectImages";
import { useLogInStatus } from "@/contexts/loggedInStatusContext";
import checkSignIn from "@/client_actions/utils/checkSignIn";

type requestStateType = "complete" | "incomplete" | "error";

export default function DragAndDropWrapper({ id }: { id: string }) {
    const [sortableItems, setSortableItems] = useState<number[]>([]);
    const [requestState, setRequestState] = useState<requestStateType>("incomplete");
    const [progress, setProgress] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [cardData, setCardData] = useState<sceneDataType | null>(null);
    const [sortedScenes, setSortedScenes] = useState<any[]>([]);
    const [imageUrls, setImageUrls] = useState<Array<{sceneNumber: Number, url: string}>>([]);

        const { loggedInStatus, setLoggedInStatus } = useLogInStatus();
    
        useEffect(() => {
            async function run() {
                const alreadySignedIn = await checkSignIn();
                setLoggedInStatus(alreadySignedIn.message === "logged in");
            }
            run();
        }, []);

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
        
        if (imageUrls.length === sortedScenes.length) {
            const updatedImages = sortableItems.map(itemId =>
                imageUrls.find(image => image.sceneNumber === itemId)
            ).filter((image): image is { sceneNumber: Number; url: string } => image !== undefined);
            setImageUrls(updatedImages);
        }
    }, [sortableItems, cardData]);

    useEffect(() => {
        async function doIt() {
            const response = await getProjectImages(id);
            if (response.hasImages) {
                setImageUrls(response.images.map((url, index) => ({sceneNumber: index + 1, url})));
            }
        }
        doIt()
    }, [])
    
    const handleSaveEdit = (description: string, id: number) => {
        setCardData(prev => {
            if (!prev || !prev.scenes || !prev.scenes[0] || !prev.scenes[0].scenes) return prev;
    
            const updatedScenes = prev.scenes[0].scenes.map(scene => {
                if (Number(scene.sceneNumber) === id) {
                    return {
                        ...scene,
                        description: description,
                    };
                }
                return scene;
            });

            return {
                ...prev,
                scenes: [
                    {
                        ...prev.scenes[0],
                        scenes: updatedScenes,
                    },
                ],
            };
        });
    }    
    
    const cards = sortedScenes.map((item) => (
        <SceneCard
            id={Number(item.sceneNumber)}
            key={Number(item.sceneNumber)}
            link={imageUrls.length === sortedScenes.length ? (imageUrls.find(urlObj => urlObj.sceneNumber === Number(item.sceneNumber) ))?.url : undefined}
            description={item.description}
            handleSaveEdit = {handleSaveEdit}
        />
    ));
    
    async function generateImages() {
        setRequestState("incomplete");
        const response = await generateCardImages(cardData?.scenes, id)
        const imageUrls = response?.data.data
        setImageUrls(imageUrls.map((url:any, index:number) => ({sceneNumber: index + 1, url}))); 
        setRequestState(response?.data.status)

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
    }, []);
    // [id, requestState]: this is the old params, use this is the progress is not updating

    return mounted ? (
        <DndContext onDragEnd={handleDragEnd}>
            <div className='flex justify-end w-full mb-5 gap-2'>
				{imageUrls.length === 0 && <button className='w-fit h-11 rounded-lg bg-gradient-to-r from-orange-500  to-varCallToAction flex items-center justify-center px-2 hover:scale-105 ease-in-out transition-transform ' onClick={generateImages}>
					Generate Images{" "}
					<Image
						src='/assets/ai.png'
						height={40}
						width={40}
						alt='ai'
					/>
				</button>}
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
