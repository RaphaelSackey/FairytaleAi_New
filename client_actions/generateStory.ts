
import axiosInstance from "./utils/axiosInstance";


type storyPromptType = {
	storyboardType: "black and white";
	sceneNumber: number;
	prompt: string;
	artStyle: "line drawn";
};

export default async function generateStory(data: storyPromptType){

    try{
        const response = await axiosInstance.post('/generatestoryboard/generate', data)
        return response.data

    }catch (e){
        return e
    }

}