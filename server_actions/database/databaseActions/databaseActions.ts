import db from "../setup";
import { dataType } from "./types";
import { hashPassword } from "@/server_actions/utils/hashPassword/encript";
import {
	addDoc,
	collection,
	getDocs,
	where,
	query,
	deleteDoc,
	arrayUnion,
	doc,
	updateDoc,
} from "firebase/firestore";

export async function addUser(data: dataType) {
	data = {
		...data,
		projects: [],
		password: await hashPassword(data.password),
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

export async function getUser(data: dataType) {
	const usersColReference = collection(db, "Users");
	const q = query(usersColReference, where("email", "==", data.email));

	const info = await getDocs(q);

	if (!info.empty) {
		return info.docs[0].data();
	} else {
		return null;
	}
}

export async function createProject(info: any) {
	const data = {
		...info,
		scenes: [],
		status: "inProgress",
	};
	const ProjectColReference = collection(db, "Projects");
	const projectId = await addDoc(ProjectColReference, data);

	return projectId.id;
}

export async function addToInProgress(id: string) {
	const InProgColReference = collection(db, "inProgress");
	addDoc(InProgColReference, { id });
}

export async function checkInProgress(id: string) {
	const InProgColReference = collection(db, "inProgress");
	const q = query(InProgColReference, where("id", "==", id));
	const isFinished = await getDocs(q);

	if (isFinished.empty) {
		return true;
	} else {
		return false;
	}
}

export async function removeFromInProgress(id: string) {
	const InProgColReference = collection(db, "inProgress");
	const q = query(InProgColReference, where("id", "==", id));
	const querySnapshot = await getDocs(q);

	querySnapshot.forEach(async (document) => {
		await deleteDoc(document.ref);
	});
}

export async function checkUserOwnsProject(
	email: string | unknown,
	id: string
) {
	const usersColReference = collection(db, "Users");
	const q = query(usersColReference, where("email", "==", email));

	const info = await getDocs(q);
	const { projects } = info.docs[0].data();
	return projects.includes(id);
}

export async function addUserProject(userId: string | unknown, projectId: string) {
	const usersColReference = collection(db, "Users");
	const q = query(usersColReference, where("email", "==", userId));
	const info = await getDocs(q);
	const userDocRef = doc(usersColReference, info.docs[0].id);

	await updateDoc(userDocRef, {
		projects: arrayUnion(projectId),
	});
}
