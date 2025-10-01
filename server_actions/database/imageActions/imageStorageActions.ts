import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../firebaseSetup";

export async function insertImageIntoDatabase(url: string) {
	try {
		const storage = getStorage(
			app,
			"gs://fairytaleai-a8f2a.firebasestorage.app"
		);

		if (!url) return "";

		const imageResponse = await fetch(url);
		if (!imageResponse.ok) {
			throw new Error(`Failed to fetch image from URL: ${url}`);
		}
		const imageBlob = await imageResponse.blob();
		const safeFileName = encodeURIComponent(url);
		const storageRef = ref(storage, `fairytaleAi/${safeFileName}`);

		await uploadBytes(storageRef, imageBlob);
		const downloadURL = await getDownloadURL(storageRef);

		return downloadURL;
	} catch (err: any) {
		console.error("Error in insertImageIntoDatabase:", err);
		throw err;
	}
}
