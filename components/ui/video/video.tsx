"use client";

import { motion } from "framer-motion";

type videoProps = {
	src: string;
};

export function Video({ data }: { data: videoProps }) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}>
			<video
                className="rounded-md border"
				autoPlay
				loop
				muted
				playsInline
				preload='none'>
				<source
					src={data.src}
					type='video/mp4'
				/>
				Your browser does not support the video tag.
			</video>
		</motion.div>
	);
}
