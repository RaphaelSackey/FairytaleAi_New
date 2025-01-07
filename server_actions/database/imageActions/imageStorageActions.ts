import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../firebaseSetup";

export async function insertImageIntoDatabase(url: string){
    const storage = getStorage(app, 'gs://fairytaleai-a8f2a.firebasestorage.app')
    
    if (!url) return ''
    
    const imageResponse = await fetch(url)
    const imageBlob = await imageResponse.blob()
    const storageRef = ref(storage, `fairytaleAi/${url}`);

    await uploadBytes(storageRef, imageBlob)
    const downloadURL = await getDownloadURL(storageRef)

    return downloadURL

}

