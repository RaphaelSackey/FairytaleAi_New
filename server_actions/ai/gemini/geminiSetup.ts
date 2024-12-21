import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);

// const schema = {
// 	description: "Generic schema for generating storyboard scenes with consistent characters and objects across all scenes",
// 	type: SchemaType.OBJECT,
// 	properties: {
// 		style: {
// 			type: SchemaType.STRING,
// 			description: "Overall visual style for the storyboard, e.g., 'Black and white line-drawn images'",
// 			nullable: false,
// 		},
// 		characters: {
// 			type: SchemaType.ARRAY,
// 			description: "List of global character definitions for consistent use across scenes",
// 			items: {
// 				type: SchemaType.OBJECT,
// 				properties: {
// 					name: {
// 						type: SchemaType.STRING,
// 						description: "The unique name of the character",
// 						nullable: false,
// 					},
// 					description: {
// 						type: SchemaType.STRING,
// 						description: "A detailed description of the character's appearance and attributes",
// 						nullable: false,
// 					}
// 				},
// 				required: ["name", "description"]
// 			}
// 		},
// 		objects: {
// 			type: SchemaType.ARRAY,
// 			description: "List of global object definitions for consistent use across scenes",
// 			items: {
// 				type: SchemaType.OBJECT,
// 				properties: {
// 					name: {
// 						type: SchemaType.STRING,
// 						description: "The unique name of the object",
// 						nullable: false,
// 					},
// 					description: {
// 						type: SchemaType.STRING,
// 						description: "A detailed description of the object's appearance and attributes",
// 						nullable: false,
// 					}
// 				},
// 				required: ["name", "description"]
// 			}
// 		},
// 		scenes: {
// 			type: SchemaType.ARRAY,
// 			description: "List of scenes with actions and references to global characters and objects",
// 			items: {
// 				type: SchemaType.OBJECT,
// 				properties: {
// 					sceneNumber: {
// 						type: SchemaType.STRING,
// 						description: "The unique identifier or number for the scene, indicating its sequence in the storyboard",
// 						nullable: false,
// 					},
// 					description: {
// 						type: SchemaType.STRING,
// 						description: "Detailed description of the scene, including actions and setting",
// 						nullable: false,
// 					},
// 					characters: {
// 						type: SchemaType.ARRAY,
// 						description: "List of character names involved in this scene, as defined globally",
// 						items: {
// 							type: SchemaType.STRING
// 						}
// 					},
// 					objects: {
// 						type: SchemaType.ARRAY,
// 						description: "List of object names present in this scene, as defined globally",
// 						items: {
// 							type: SchemaType.STRING
// 						}
// 					}
// 				},
// 				required: ["sceneNumber", "description", "characters", "objects"]
// 			}
// 		}
// 	},
// 	required: ["style", "characters", "objects", "scenes"]
// };

const schema = {
    description: "Schema for generating self-contained storyboard scenes with detailed characters and objects in each scene.",
    type: SchemaType.OBJECT,
    properties: {
        style: {
            type: SchemaType.STRING,
            description: "The overall visual style of the storyboard (e.g., 'Black and white line-drawn images').",
            nullable: false,
        },
        scenes: {
            type: SchemaType.ARRAY,
            description: "List of scenes, each with detailed descriptions of characters, objects, and environments.",
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    sceneNumber: {
                        type: SchemaType.STRING,
                        description: "The unique identifier or number for the scene, indicating its sequence.",
                        nullable: false,
                    },
                    description: {
                        type: SchemaType.STRING,
                        description: "A detailed, self-contained description of the scene, including characters, objects, and environment.",
                        nullable: false,
                    },
                    characters: {
                        type: SchemaType.ARRAY,
                        description: "Detailed descriptions of all characters present in this scene.",
                        items: {
                            type: SchemaType.OBJECT,
                            properties: {
                                name: {
                                    type: SchemaType.STRING,
                                    description: "The unique name of the character.",
                                    nullable: false,
                                },
                                description: {
                                    type: SchemaType.STRING,
                                    description: "A detailed description of the character's appearance, attire, and emotional state.",
                                    nullable: false,
                                }
                            },
                            required: ["name", "description"]
                        }
                    },
                    objects: {
                        type: SchemaType.ARRAY,
                        description: "Detailed descriptions of all objects present in this scene.",
                        items: {
                            type: SchemaType.OBJECT,
                            properties: {
                                name: {
                                    type: SchemaType.STRING,
                                    description: "The unique name of the object.",
                                    nullable: false,
                                },
                                description: {
                                    type: SchemaType.STRING,
                                    description: "A detailed description of the object's appearance, material, and placement.",
                                    nullable: false,
                                }
                            },
                            required: ["name", "description"]
                        }
                    }
                },
                required: ["sceneNumber", "description", "characters", "objects"]
            }
        }
    },
    required: ["style", "scenes"]
};
const geminiModel = genAI.getGenerativeModel({
	model: "gemini-1.5-flash",
	generationConfig: {
		responseMimeType: "application/json",
		responseSchema: schema,
		temperature: 2.0,
	},
});

export default geminiModel