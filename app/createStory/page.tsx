"use client";
import { useLayoutEffect, useState } from "react";
import checkSignIn from "@/client_services/utils/checkSignIn";
import { ErrorAlert } from "@/components/ui/alert/errorAlert";
import AddStoryCard from "@/components/ui/addStory/addStoryCard";
import StoryCard from "@/components/ui/storyCard/storyCard.jsx"
import StoryForm from "@/components/ui/sotryForm/storyForm";

export default function CreatStory() {
	const [loggedIn, setLoggedIn] = useState<boolean>(false);
	const [showStoryForm, setShowStoryForm] = useState(false)

	// check if user is already logged in
	useLayoutEffect(() => {
		async function run() {
			const alreadySignedIn = await checkSignIn();

			if (alreadySignedIn) console.log(alreadySignedIn);
		}
		run();
	});

	function handleShowStoryForm(){
		setShowStoryForm(prev => !prev)
	}

	return (
		
		<div>
			{showStoryForm && <StoryForm showStoryForm={handleShowStoryForm}/>}
			<div className='container mx-auto gap-5 flex flex-col'>
				<section className='top flex flex-col gap-4 mb-10'>
					<div className='font-suseMedium text-4xl'>
						Welcome to Boords!
					</div>
					<div className='font-suseMedium text-md opacity-70'>
						Your dream pre-production workflow starts here. Create
						your first storyboard and experience how teams like
						yours cut their pre-production time in half.
					</div>
				</section>

				<section className='bottom flex flex-col gap-4 items-center'>
					<div>
						STORYBOARDS 1
					</div>

					<div className='stories grid grid-rows-* grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3 items-center w-[95%] lg:w-[90%]'>
                        <StoryCard />
                        <StoryCard />
                        <StoryCard />
						
						<AddStoryCard showStoryForm={handleShowStoryForm}/>
					</div>
				</section>
			</div>
		</div>
	);
}
