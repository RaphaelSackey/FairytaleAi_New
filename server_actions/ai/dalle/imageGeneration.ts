import OpenAI from "openai";

export default async function generateImage(prompt: string) {
	const openai = new OpenAI();
	openai.apiKey = process.env.OPENAI_API_KEY as string;
	const image = await openai.images.generate({
		model: "dall-e-3",
		prompt: prompt,
		size: "1024x1024",
		response_format: "url",
	});
	console.log(image);
	return image.data[0].url;
}
