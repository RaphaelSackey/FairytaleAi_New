import axiosInstance from "./utils/axiosInstance";

export default async function generateCardImages(data: any, id: string) {
	try {
		const response = await axiosInstance.post(
			`/generatecardimages/${id}`,
			data
		);
		return response;
	} catch (e: any) {
		console.error("Error in client generateCardImages:", e);
		throw e;
	}
}
