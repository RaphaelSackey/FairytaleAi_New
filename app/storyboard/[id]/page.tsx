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
			
			<DragAndDropWrapper id = {id}/>
		</div>
	);
}
