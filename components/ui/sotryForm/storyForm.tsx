'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";


type storyPromptType = {
	storyboardType: "black and white";
	sceneNumber: number;
	prompt: string;
	artStyle: "line drawn";
};

export default function StoryForm({showStoryForm}: {showStoryForm:() => void}) {
    
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
	const [formData, setFormdata] = useState<storyPromptType>({
		storyboardType: "black and white",
		sceneNumber: 0,
		prompt: "",
		artStyle: "line drawn",
	});
    
    useEffect(() => setMounted(true), []);

	function handleFormChange(event:React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> ) {
        const name = event.target.name
        const value = event.target.value
        setFormdata(prev => ({
            ...prev,
            [name]: value
        }))
    }


	return (
		<div className='fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm' onClick={showStoryForm}>
			<form className='dark:border-border flex flex-col h-fit w-[32rem] p-4 rounded-lg gap-4 dark:bg-background bg-gray-200 border-gray-400 border' onClick={ e => e.stopPropagation()}>
				<div className='font-suseMedium text-3xl font-bold mb-10'>
					New storyboard
				</div>

				<label
					htmlFor='storyboardType'
					className='font-suseLight'>
					Storyboard Type:
				</label>
				<div className="flex items-center w-full bg-blue-500 rounded-lg relative">
                    <select
                        id='storyboardType'
                        name='storyboardType'
                        value={formData.storyboardType}
                        onChange={handleFormChange}
                        required
                        className='rounded p-3 appearance-none w-full'>
                        <option value=''>Select a type</option>
                        <option value='black and white'>black and white</option>
                        <option value='comedy'>Comedy</option>
                    </select>
                    {mounted && <Image src={theme == 'dark'? '/assets/downArrowd.png': '/assets/downArrow.png'} height={15} width={15} alt="arrow" className="absolute right-2 pointer-events-none"/>}
                </div>

				<label
					htmlFor='storyboardType'
					className='font-suseLight'>
					Art Style:
				</label>
				<div className="flex items-center w-full bg-blue-500 rounded-lg relative">
                    <select
                        id='artStyle'
                        name='artStyle'
                        value={formData.artStyle}
                        onChange={handleFormChange}
                        className='rounded p-3 appearance-none w-full'
                        required>
                        <option value=''>Select Art Style</option>
                        <option value='line drawn'>line drawn</option>
                        <option value='comedy'>Realistic</option>
                    </select>
                    {mounted && <Image src={theme == 'dark'? '/assets/downArrowd.png': '/assets/downArrow.png'} height={15} width={15} alt="arrow" className="absolute right-2 pointer-events-none"/>}

                </div>

				<label
					htmlFor='frameCount'
					className='font-suseLight'>
					Number of Scenes:
				</label>
				<input
					type='number'
					id='sceneNumber'
					name='sceneNumber'
					value={formData.sceneNumber}
					onChange={handleFormChange}
					min='1'
					max='50'
					className='rounded p-3 appearance-none'
					required
				/>

				<label
					htmlFor='description'
					className='font-suseLight'>
					Write Prompt:
				</label>
				<textarea
					id='prompt'
					name='prompt'
					value={formData.prompt}
					onChange={handleFormChange}
					rows={4}
					placeholder='Enter a description for your storyboard'
					required
					className='rounded p-3 appearance-none'></textarea>

				<div className="flex items-center justify-center">
					<button className='bg-callToAction px-4 py-3 font-suseMedium rounded-sm hover:cursor-pointer hover:opacity-85'>
						Generate Storyboard
					</button>
				</div>
			</form>
		</div>
	);
}
