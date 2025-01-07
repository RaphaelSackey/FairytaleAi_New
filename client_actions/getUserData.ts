import axiosInstance from "./utils/axiosInstance";

export async function getUserData(){
    const response = await axiosInstance.get(`/getuserdata`)
    return response.data
}