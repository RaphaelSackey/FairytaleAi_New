import LargeSectionImgR from "../components/ui/sections/largeSectionIR";
import Timeline from "@/components/ui/sections/timeline";

export default function Home() {
	return (
		<div className='container mx-auto'>
			<LargeSectionImgR
				img='/images/test/1.webp'
				title='Fairytale AI'
				body='Your AI Powered Storyboard Generator'
			/>
			<Timeline />
		</div>
	);
}
