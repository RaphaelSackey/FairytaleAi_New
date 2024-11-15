import { ReactNode } from "react"

type BbuttonProps = {
    children: ReactNode
}
export default function Bbutton({children}: BbuttonProps){
    
    return(
        <button className="bg-callToAction py-3 px-20 w-fit h-fit rounded-md">
            {children}
        </button>
    )
}