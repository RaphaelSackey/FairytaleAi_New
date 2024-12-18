import axiosInstance from "./utils/axiosInstance"
import { AxiosInstance, AxiosResponse} from "axios";

export type CreateAccountTypes = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}


export default async function CreateAccount(data: CreateAccountTypes):Promise<AxiosResponse<any>>{
    const axios: AxiosInstance = axiosInstance
    try{
        const response = await axios.post('/signup', data)
        return response
    }catch (e:any){
        return e
    }
   

}