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
        You are a storyboard script generator. Your task is to generate a detailed storyboard script consisting of ${sceneNumber} scenes in the style of "${style} ${storyboardType}" for a project.
        
        Each scene must be fully self-contained and described in a single consolidated paragraph formatted specifically for a DALL-E 3 prompt. The description must include:

        1. Core Character Appearance:
            - A concise phrase defining the character's face, hair, and build (e.g., "a distinctly feminine green-eyed, white-furred tabaxi monk with fluffy cheeks and a tuft on her head").
            - Worn and carried items, with specific colors, patterns, and textures (e.g., "wearing a simple green monk tunic and carrying a pack").
            - items that are noticeable across multiple scenes should be described in detail. items like shoes, hair clips, any styles or designs in clothing, bag pack type, bag pack color, bag pack noticeable design etc. Essentially, anythign that will be easily noticeable in the image.
            - include skin color, hair color, hair type, hair length, eye color, and any other relevant details.
            - Each scene must have the full character and object description, even if the character or object is the same across scenes. Ensure consistency in character and object appearance.

        2. Style Attributes:
            - Stylistic attributes such as "gradient shading, clean line work, vibrant palette, stylized proportions."

        3. Scenario:
            - A dynamic action, with verbs that describe full-body activity (e.g., "leaping over a moss-covered stone, sitting with legs crossed, trowing ball with arms stretched out").
            - Strong emotions expressed through facial expressions or body language.
            - each scene must have a action, even if the character is the same across scenes.

        4. Environment:
            - Detailed background elements (e.g., "a serene forest setting with towering ancient trees and vibrant ferns").
            - Time of day, weather, and overall mood (e.g., "under soft morning light with dappled shadows").

        5. Objects:
            - All relevant objects in the scene, described with their material, color, condition, and spatial arrangement (e.g., "a small leather-bound journal protruding from her pack").
        Input Prompt:

        6. writing style:
            - make sure the wording of the description does not contain too violent words or anything that will make the image generation model(DALL-E 3) refuse the request to generate the image.
        7. speech bubbles:
            - if there are any conversations for a scene include speech bubbles for the characters.

        "${prompt}"

        Please generate ${sceneNumber} scenes, ensuring every description adheres to the format outlined above. The descriptions will be passed to an image generation AI (DALL-E 3) and must be detailed enough to create consistent outputs across all scenes.
    `;

	const result = await geminiModel.generateContent(fullPrompt);
    console.log(result.response.text())

	await addProjectSceneContents(
		JSON.parse(result.response.text()),
		projectId
	);
	await removeFromInProgress(projectId);
}
