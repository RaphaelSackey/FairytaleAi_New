import db from "../setup";
import { dataType } from "./types";
import { hashPassword } from "@/server_services/hashPassword/encript";
import { addDoc, collection, getDocs, where, query } from "firebase/firestore";

export async function addUser(data: dataType) {
	data = {
		...data,
		projects: [],
		password: await hashPassword(data.password)
	};
	const usersColReference = collection(db, "Users");
	const q = query(usersColReference, where("email", "==", data.email));

	const alreadyExits = await getDocs(q);

	if (!alreadyExits.empty) {
		return { message: "user already exists" };
	} else {
		const success = await addDoc(usersColReference, data);
		if (success) {
			return { message: "success" };
		} else {
			return { message: "something went wrong" };
		}
	}
}
