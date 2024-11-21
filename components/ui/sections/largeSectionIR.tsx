import Image from "next/image";
import Navbutton from "../buttons/navbasicB";

type sectionLayout = {
	img: string;
	title: string;
	body: string;
	button?: boolean;
};

export default function LargeSectionImgR({
	img,
	title,
	body,
	button,
}: sectionLayout) {
	return (
		<div className='section-wrapper grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 w-full h-fit lg:h-[80%] lg:min-h-[35rem] lg:max-h-[80%] lg:gap-3 mb-8'>
			<div className='content flex flex-col h-[35rem] min-h-[35rem] max-h-[35rem] lg:min-h-full lg:max-h-full lg:mr-40 lg:pt-14'>
				<h1 className='text-5xl font-suseMedium'>
					{title} This is something
				</h1>
				<h3 className='font-suseMedium opacity-80 py-5'>
					{body} People who searched for ai storyboard generator –
					just like you – already use Miro. Join 70M+ users.
				</h3>
				<h3 className='font-suseMedium opacity-80 py-3'>
					Discover the power of collaborative storytelling with Miro's
					AI Storyboard Generator. Get started today and see how it
					can help you create amazing stories!
				</h3>
				{true && <Navbutton href='/createStory'>Get Started</Navbutton>}
			</div>

			<div className='img relative h-[35rem] min-h-[35rem] lg:h-full max-h-full'>
				<div className='bg-callToAction opacity-60 h-[35rem] min-h-[35rem] lg:h-full max-h-full blur-3xl rounded-full'></div>
				<Image
					src={img}
					alt='img'
					fill={true}
					sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
					className='rounded-xl'
				/>
			</div>
		</div>
	);
}
