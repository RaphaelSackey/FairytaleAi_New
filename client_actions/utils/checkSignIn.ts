
import axiosInstance from "./axiosInstance";

export default async function checkSignIn(){
    const results = await axiosInstance.get('/checksignedin')
    return results.data
}