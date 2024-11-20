import { motion } from "framer-motion"

type videoProps= {
    src: string
}

export function Video({data}: {data: videoProps}) {
	return (
		<video
			autoPlay
            loop
            muted
            playsInline
			preload='none'>
                
			<source
				src= {data.src}
				type='video/mp4'
			/>
			
			Your browser does not support the video tag.
		</video>
	);
}
