import axiosInstance from "./utils/axiosInstance"
import { AxiosInstance, AxiosResponse} from "axios";

export type signInTypes = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}


export default async function signIn(data: signInTypes ):Promise<AxiosResponse<any>>{
    const axios: AxiosInstance = axiosInstance
    try{
        const response = await axios.post('/login', data)
        return response
    }catch (e:any){
        return e
    }
   

}