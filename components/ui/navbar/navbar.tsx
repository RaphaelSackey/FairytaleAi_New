'use client'

import Image from "next/image";
import Link from "next/link";
import DarkModeToggle from "../modeToggler/modeToggle";
import { usePathname } from 'next/navigation'
export default function Navbar() {
	const pathname = usePathname()
	return (
		<div className='h-16 container mx-auto sticky top-3 mb-14 z-50'>
			<div className='floating_nav h-full mx-[10%] rounded-full items-center flex justify-between border bg-white dark:bg-background'>
				<div className="nav_left_wrapper flex items-center gap-3">
					<Image
						src='/sitelogos/logo.png'
						width={70}
						height={50}
						alt='site logo'
					/>
					<Link href={"/"} className= {`dark:hover:text-neutral-300 hover:text-neutral-500 ${pathname == '/'? 'underline': ''}`}>Home</Link>
					<Link href={"/profile"} className= {`dark:hover:text-neutral-300 hover:text-neutral-500 ${pathname == '/profile'? 'underline': ''}`}>Profile</Link>
				</div>

                <div className="nav_right_wrapper gap-3 flex mx-3">
                    <Link href='/signInOut' className="rounded-full border px-4 transition ease-in-out hover:border-2 flex justify-center items-center">login</Link>
                    <Link href='/createStory' className="rounded-full border  px-3 bg-gradient-to-r from-callToAction transition ease-in-out hover:bg-callToAction duration-500 flex justify-center items-center">Create Story</Link>
                    <DarkModeToggle />
                </div>
			</div>
		</div>
	);
}
