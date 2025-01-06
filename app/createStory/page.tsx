"use client";
import { useEffect, useState } from "react";
import checkSignIn from "@/client_actions/utils/checkSignIn";
import { NormalAlert } from "@/components/ui/alert/normalAlert";
import AddStoryCard from "@/components/ui/addStory/addStoryCard";
import StoryCard from "@/components/ui/storyCard/storyCard";
import StoryForm from "@/components/ui/sotryForm/storyForm";
import { useLogInStatus } from "@/contexts/loggedInStatusContext";
import { getUserData } from "@/client_actions/getUserData";
import { getProjectImages } from "@/client_actions/getProjectImages";


export default function CreateStory() {
	const [showStoryForm, setShowStoryForm] = useState(false);
	const { loggedInStatus, setLoggedInStatus } = useLogInStatus();
	const [storyboards, setStoryboards] = useState<Array<string>>([])

	const cads = storyboards.map(item => <StoryCard key={item[1]} img={item[1]} id ={item[0]}/>);
	
	useEffect(() => {
		async function run() {
			const alreadySignedIn = await checkSignIn();
			setLoggedInStatus(alreadySignedIn.message === "logged in");
		}
		run();
	}, []);

	useEffect(()=> {
		const doIt = async () => {
			const userData = await getUserData()
			const info: Array<string> = await Promise.all( userData.projects.slice(-3).map(async (item:string) => {
				const images = await getProjectImages(item)
				if (images.hasImages){
					return [item, images.images[0]]
				}
				else{
					return [item, '/assets/image.webp']
				}
				
			}))
			setStoryboards(info)
		}
		
		if (loggedInStatus){
			doIt()
		}
	}, [loggedInStatus])

	function handleShowStoryForm() {
		setShowStoryForm((prev) => !prev);
	}

	if (loggedInStatus === null) {
		return <div>loading...</div>;
	} else {
		return loggedInStatus ? (
			<div>
				{showStoryForm && (
					<StoryForm showStoryForm={handleShowStoryForm} />
				)}
				<div className='container mx-auto gap-5 flex flex-col'>
					<section className='top flex flex-col gap-4 mb-10'>
						<div className='font-suseMedium text-4xl'>
							Welcome to Boords!
						</div>
						<div className='font-suseMedium text-md opacity-70'>
							Your dream pre-production workflow starts here.
							Create your first storyboard and experience how
							teams like yours cut their pre-production time in
							half.
						</div>
					</section>

					<section className='bottom flex flex-col gap-4 items-center'>
						{/* <div>STORYBOARDS 1</div> */}

						<div className='stories grid grid-rows-* grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3 items-center w-[95%] lg:w-[90%]'>
							{cads}

							<AddStoryCard showStoryForm={handleShowStoryForm} />
						</div>
					</section>
				</div>
			</div>
		) : (
			<div className='container mx-auto flex items-center justify-center w-full  min-w-full'>
				<NormalAlert message='You need to be logged in to create stories' />
			</div>
		);
	}
}
