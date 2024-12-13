"use client";

import { useLayoutEffect } from "react";
import LargeSectionImgR from "../components/ui/sections/largeSectionIR";
import Timeline from "../components/ui/sections/timeline";
import { Video } from "../components/ui/video/video";
import Footer from "@/components/ui/footer/footer";
import checkSignIn from "@/client_actions/utils/checkSignIn";

export default function Home() {
	// check if user is already logged in
	// useLayoutEffect(() => {
	// 	async function run(){
	// 		const alreadySignedIn = await checkSignIn()
	// 		console.log(alreadySignedIn )
	// 	}
	// 	run()
	// })

	const entries = [
		{
			title: "Write a prompt",
			content: <Video src='/videos/1.mp4' />,
		},
		{
			title: "Make edits if necessary",
			content: <Video src='/videos/2.mp4' />,
		},
		{
			title: "Generate storyboard",
			content: <Video src='/videos/3.mp4' />,
		},
		{
			title: "Save and download",
			content: <Video src='/videos/4.mp4' />,
		},
	];

	return (
		<div>
			<div className='container mx-auto'>
				<LargeSectionImgR
					img='/images/test/1.webp'
					title='Fairytale AI'
					body='Your AI Powered Storyboard Generator'
				/>
				<Timeline data={entries} />
			</div>
			<Footer />
		</div>
	);
}
