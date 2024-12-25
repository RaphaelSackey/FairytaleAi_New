import geminiModel from "./geminiSetup";
import { addProjectSceneContents } from "@/server_actions/database/databaseActions/databaseActions";
import { removeFromInProgress } from "@/server_actions/database/databaseActions/databaseActions";

export default async function generateSceneText(
	prompt: string,
	sceneNumber: string,
	style: string,
	storyboardType: string,
	projectId: string
) {
	const fullPrompt = `
    You are a storyboard script generator. Your are tasked with generating a detailed storyboard script consisting of ${sceneNumber} scenes in the style of "${style} ${storyboardType}" for a project.
    
    Strict guidelines must be followed to ensure consistency and clarity. repeat the character and object descriptions in each scene they appear in to improve consistency. Each scene must be **self-contained** and must include: 
    1. assume each scene does not have any context from any other scene. so dont say tuff like "same as before". all full descriptions of objects and characters needed for each scene should repeated and explicitly stated.
    2. Detailed Character Descriptions:
        For each character in the scene, provide:
        Name, height, build, hairstyle, and hair color,
        Skin tone and facial features,
        Clothing (colors, patterns, and textures),
        Accessories or distinguishing details (e.g., glasses, watches, bags),
        Facial expressions and emotions,
    
    3.Detailed Object Descriptions:
        For each object in the scene, provide:
        Name, size, material, color, condition, any visual element that must remain consistent,
        Placement and spatial arrangement relative to characters and other objects,
    
    4. Environmental Details:
       Include background elements like trees, benches, sidewalks, lighting etc,
       Specify time of day, weather, and overall mood,
    
    5. Character Actions and Interactions:
    Describe exactly what each character is doing, their body language, and their emotional state.
    6. all clothing items must be explicitly describes in each scene. shoe type, color, any patterns on it, the same for shirt, sock, etc. dont leave anything explicity un described
    7. hair styles must be describes explicitly in each scene.
    8. dont put too much events in one scene. each scene should contain the least possible amount of action.
    9. Consistency Across Scenes:
       - Ensure characters and objects remain identical in appearance and placement across scenes unless explicitly stated otherwise.
    
    all the instructions above are mandatory make sure you dont omit any descriptions or leave any detail out
    Input Prompt:
    "${prompt}"
    
    
    Please generate ${sceneNumber} scenes that follow these guidelines. Note that output will be used as a prompt by an image generation ai to generate the actual images for each scene separately one by one this is why it is crucial each image has all it needs to be generated in isolation while still looking identical to others that were generated or will be generated for future scenes.
    
    Ensure that the descriptions aligns with "${style} ${storyboardType}" style.
    `;

	const result = await geminiModel.generateContent(fullPrompt);

	await addProjectSceneContents(
		JSON.parse(result.response.text()),
		projectId
	);
	await removeFromInProgress(projectId);
}
