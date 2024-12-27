import axiosInstance from "./utils/axiosInstance";

export type dataType = {
    artStyle: string;
    prompt: string;
    sceneNumber: string;
    scenes: sceneDataType[];
    status: string;
    storyboardType: string;
};

export type sceneDataType = {
    scenes: Array<{
        description: string;
        sceneNumber: string;
    }>;
    style: string;
};

type responseType = {
    status: requestStateType;
    numProg: number;
    data: dataType;
};

type errorType = {
    status: "error";
    numProg: number;
    data: [];
};

type getDataReturnType = responseType | errorType;

type requestStateType = "complete" | "incomplete" | "error";

export default async function getData(id: string): Promise<getDataReturnType> {
    try {
        const response = await axiosInstance.get(`generatestoryboard/${id}`);
        const data: responseType = response.data;
        return data;
    } catch (e) {
        console.log(e);
        return { status: "error", numProg: 0, data: [] };
    }
}
