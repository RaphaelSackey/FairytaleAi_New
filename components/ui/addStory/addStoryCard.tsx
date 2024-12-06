'use client'

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";


import Image from "next/image"
export default function AddStoryCard({showStoryForm}: {showStoryForm: ()=> void}){
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();

    useEffect(() => setMounted(true), []);
    return (
        <div className="border w-full h-64 flex flex-col items-center justify-center rounded-sm gap-2 hover:bg-border hover:cursor-pointer" onClick={showStoryForm}>
            {mounted && <Image src= {theme == 'dark'? '/assets/plusd.svg' : '/assets/plus.svg'} height={30} width={30} alt="plus sign" className=""/>}
            <div className="text-center font-suseLight">New Storyboard</div>
        </div>
    )
}