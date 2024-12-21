
import { removeFromInProgress } from "../databaseActions/databaseActions"
export async function generateImages(id:string, data:any ){
    return new Promise((resolve) => {
        setTimeout(() => {
            removeFromInProgress(id);
            resolve(data);
        }, 10000);
    });
      
}