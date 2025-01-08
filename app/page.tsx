"use client";

import { useLayoutEffect } from "react";
import LargeSectionImgR from "../components/ui/sections/largeSectionIR";
import Timeline from "../components/ui/sections/timeline";
import { Video } from "../components/ui/video/video";
import Footer from "@/components/ui/footer/footer";
import checkSignIn from "@/client_actions/utils/checkSignIn";

export default function Home() {

	const entries = [
		{
			title: "Craft Your Prompt and Personalize Your Storyboard",
			content: <Video src='/videos/1.mp4' />,
		},
		{
			title: "Auto-Generate Scenes and Make Easy Edits",
			content: <Video src='/videos/2.mp4' />,
		},
		{
			title: "Bring Your Story to Life with Generated Images",
			content: <Video src='/videos/3.mp4' />,
		},
		{
			title: "Save and Download Your Final Storyboard",
			content: <Video src='/videos/4.mp4' />,
		},
	]

	return (
		<div>
			<div className='container mx-auto'>
				<LargeSectionImgR
					img='/images/test/1.png'
					title='Fairytale AI'
					body='Your AI Powered Storyboard Generator'
				/>
				<Timeline data={entries} />
			</div>
			<Footer />
		</div>
	);
}
