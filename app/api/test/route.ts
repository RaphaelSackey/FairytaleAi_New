import { NextResponse } from "next/server";
import { addUser } from "../../../server_services/database/databaseActions/actions";

type responseType = {
	message: string
}
export async function POST(request: Request) {
	const data = await request.json();

	const results: responseType = await addUser(data);
	return  NextResponse.json(results)	

}
