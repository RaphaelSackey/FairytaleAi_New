"use client";

import { motion } from "framer-motion";

type VideoProps = {
	src: string;
};

export function Video({ src }: VideoProps) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}>
			<video
				className='rounded-md border w-full h-full object-cover'
				autoPlay
				loop
				muted
				playsInline
				preload='none'>
				<source
					src={src}
					type='video/mp4'
				/>
				Your browser does not support the video tag.
			</video>
		</motion.div>
	);
}
