import Image from "next/image";
import Link from "next/link";
import DarkModeToggle from "../modeToggler/modeToggle";
export default function Navbar() {

	return (
		<div className='bg-blue-300 h-16 container mx-auto'>
			<div className='floating_nav  bg-red-500 h-full mx-[10%] rounded-full items-center flex justify-between'>
				<div className="nav_left_wrapper flex items-center gap-3">
					<Image
						src='/sitelogos/logo.png'
						width={70}
						height={50}
						alt='site logo'
					/>
					<Link href={"/"}>Home</Link>
					<Link href={"/profile"}>Profile</Link>
				</div>

                <div className="nav_right_wrapper gap-3 flex mx-3">
                    <button className="rounded-full border border-black px-2">login</button>
                    <button className="rounded-full border border-black px-2">Create Story</button>
                    <DarkModeToggle />
                </div>
			</div>
		</div>
	);
}
