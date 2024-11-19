import LargeSectionImgR from "../components/ui/sections/largeSectionIR";
import Footer from "@/components/ui/footer/footer";

export default function Home() {
	return (
		<div className='container mx-auto'>
			<LargeSectionImgR
				img='/images/test/1.webp'
				title='Fairytale AI'
				body='Your AI Powered Storyboard Generator'
			/>
			<LargeSectionImgR
				img='/images/test/1.webp'
				title='Fairytale AI'
				body='Your AI Powered Storyboard Generator'
			/>
			<LargeSectionImgR
				img='/images/test/1.webp'
				title='Fairytale AI'
				body='Your AI Powered Storyboard Generator'
			/>
		</div>
	);
}
