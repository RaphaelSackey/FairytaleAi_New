import axiosInstance from "./utils/axiosInstance";

type storyPromptType = {
	storyboardType: "black and white" | "colored";
	sceneNumber: number;
	prompt: string;
	artStyle:
		| "line drawn"
		| "Digital painting"
		| "Cartoon"
		| "Realistic"
		| "Abstract";
};

export default async function generateStory(data: storyPromptType) {
	try {
		const response = await axiosInstance.post(
			"/generatestoryboard/generate",
			data
		);
		return response.data;
	} catch (e: any) {
		console.error("Error in client generateStory:", e);
		throw e;
	}
}
