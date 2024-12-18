import axiosInstance from "./utils/axiosInstance";

type cardDataType = {
	id: number;
	description: string;
	dialog: string;
	action: string;
	position: number;
};

type dataType = {
    status: requestStateType;
    numProg: number;
    data: cardDataType[];
}


type requestStateType = "complete" | "incomplete" | "error";

export default async function getData(id: string){
    try {
        const response = await axiosInstance.get(
            `generatestoryboard/${id}`
        );
        const data: dataType = response.data;
        return data
    
    } catch (e) {
        console.log(e);
        return {status: 'error', numProg: 0, data: []}
    }

}