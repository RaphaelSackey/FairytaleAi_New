import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY as string;
let genAI: any;
try {
	genAI = new GoogleGenerativeAI(apiKey);
} catch (err: any) {
	console.error("Error initializing GoogleGenerativeAI:", err);
	throw err;
}

const schema = {
	description:
		"Schema for generating storyboard scenes with consolidated descriptions for DALL-E 3 prompts.",
	type: SchemaType.OBJECT,
	properties: {
		style: {
			type: SchemaType.STRING,
			description:
				"The overall visual style of the storyboard (e.g., 'Digital painting with gradient shading, clean linework, vibrant palette, stylized proportions').",
			nullable: false,
		},
		scenes: {
			type: SchemaType.ARRAY,
			description:
				"List of scenes, each described as a single consolidated paragraph for DALL-E 3 prompts.",
			items: {
				type: SchemaType.OBJECT,
				properties: {
					sceneNumber: {
						type: SchemaType.STRING,
						description:
							"The unique identifier or number for the scene, indicating its sequence.",
						nullable: false,
					},
					description: {
						type: SchemaType.STRING,
						description:
							"A single, consolidated paragraph containing all details for the scene, including characters, actions, objects, environment, and style, formatted for DALL-E 3.",
						nullable: false,
					},
				},
				required: ["sceneNumber", "description"],
			},
		},
	},
	required: ["style", "scenes"],
};

const geminiModel = genAI.getGenerativeModel({
	model: "gemini-2.5-pro",
	generationConfig: {
		responseMimeType: "application/json",
		responseSchema: schema,
		temperature: 2.0,
	},
});

export default geminiModel;
