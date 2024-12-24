import OpenAI from "openai";

export default async function generateImage(prompt: any, style: string){
    const openai = new OpenAI();
    openai.apiKey = process.env.OPENAI_API_KEY as string;
    const formattedPrompt = JSON.stringify(prompt)
    console.log(formattedPrompt)
    const image = await openai.images.generate({ model: "dall-e-3", prompt: ` Generate a ${style} image with the following requirements. Make sure you follow all the specifications: ${formattedPrompt}`, size: "1024x1024", response_format : "url", style: "natural"});
    console.log(image)
    return image.data[0].url
}

