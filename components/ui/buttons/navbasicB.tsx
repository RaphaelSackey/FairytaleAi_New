import { ReactNode } from "react"
import Link from "next/link"

type NavbuttonProps = {
    children: ReactNode
    href: string
}
export default function Navbutton({href, children}: NavbuttonProps){
    
    return(
        <Link href={href} className="bg-callToAction py-3 px-20 w-fit h-fit rounded-md hover:opacity-80 transition ease-in-out duration-200">
            {children}
        </Link>
    )
}