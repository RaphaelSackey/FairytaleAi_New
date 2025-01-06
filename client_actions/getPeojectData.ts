import axiosInstance from "./utils/axiosInstance";

export async function getProjectData(id:string){
    const response = await axiosInstance.get(`/getprojectdata/${id}`)
    return response.data
   
}