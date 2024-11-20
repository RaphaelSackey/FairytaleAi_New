import LargeSectionImgR from "../components/ui/sections/largeSectionIR";
import Timeline  from "../components/ui/sections/timeline";
import { Video } from "../components/ui/video/video";

export default function Home() {
	const entries = [
		{
			title: 'Write a prompt',
			content: <Video data={{src: '/videos/1.mp4'}}/>
		},
		{
			title: 'Make edits if neccessary',
			content: <Video data={{src: '/videos/2.mp4'}}/>
		},
		{
			title: 'generate storyboard',
			content: <Video data={{src: '/videos/3.mp4'}}/>
		},
		{
			title: 'save and download',
			content: <Video data={{src: '/videos/4.mp4'}}/>
		},
	]
	return (
		<div className='container mx-auto'>
			<LargeSectionImgR
				img='/images/test/1.webp'
				title='Fairytale AI'
				body='Your AI Powered Storyboard Generator'
			/>
			<Timeline data={entries }/>
		</div>
	);
}
