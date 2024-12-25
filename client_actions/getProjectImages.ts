import axiosInstance from "./utils/axiosInstance";

export async function getProjectImages(id: string): Promise<{hasImages: boolean, images: string[]}> {
    const response = await axiosInstance.get(`/getprojectimages/${id}`)
    return response.data
}