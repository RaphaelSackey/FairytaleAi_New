import axios from "axios";
import axiosInstance from "./axiosInstance";

export default async function checkSignIn(){
    const results = await axios.get('/api/checksignedin')
    return results.data
}