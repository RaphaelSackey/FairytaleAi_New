import Image from "next/image";
import Link from "next/link";
import DarkModeToggle from "../modeToggler/modeToggle";
export default function Navbar() {

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
					<Link href={"/"} className=" dark:hover:text-neutral-300 hover:text-neutral-500">Home</Link>
					<Link href={"/profile"} className=" dark:hover:text-neutral-300 hover:text-neutral-500">Profile</Link>
				</div>

                <div className="nav_right_wrapper gap-3 flex mx-3">
                    <button className="rounded-full border px-4">login</button>
                    <button className="rounded-full border px-3">Create Story</button>
                    <DarkModeToggle />
                </div>
			</div>
		</div>
	);
}
