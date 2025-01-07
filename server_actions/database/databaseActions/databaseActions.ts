import db from "../firebaseSetup";
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
	getDoc,
} from "firebase/firestore";

export async function addUser(data: dataType) {
	data = {
		...data,
		projects: [],
		password: await hashPassword(data.password),
	};
	const usersColReference = collection(db, "users");
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

export async function getUser(
	data:
		| dataType
		| {
				email: string;
				iat: number;
				exp: number;
		  }
) {
	const usersColReference = collection(db, "users");
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
		dateCreated: new Date().toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		}),
	};
	const ProjectColReference = collection(db, "projects");
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
	const usersColReference = collection(db, "users");
	const q = query(usersColReference, where("email", "==", email));

	const info = await getDocs(q);
	const { projects } = info.docs[0].data();
	return projects.includes(id);
}

export async function addNewUserProject(
	userId: string | unknown,
	projectId: string
) {
	const usersColReference = collection(db, "users");
	const q = query(usersColReference, where("email", "==", userId));
	const info = await getDocs(q);
	const userDocRef = doc(usersColReference, info.docs[0].id);

	await updateDoc(userDocRef, {
		projects: arrayUnion(projectId),
	});
}

export async function addProjectSceneContents(content: {}, projectId: string) {
	const usersColReference = collection(db, "projects");
	const userDocRef = doc(usersColReference, projectId);

	await updateDoc(userDocRef, {
		scenes: arrayUnion(content),
	});
}

export async function getProjectSceneInfo(projectId: string) {
	const usersColReference = collection(db, "projects");
	const userDocRef = doc(usersColReference, projectId);

	const data = await getDoc(userDocRef);

	return data.data();
}

export async function addImageLinksToUserProject(
	links: Array<string>,
	projectId: string
) {
	const usersColReference = collection(db, "imageLinks");
	await addDoc(usersColReference, { projectId: projectId, imageUrls: links });
}

export async function getProjectImageLinks(projectId: string) {
	const usersColReference = collection(db, "imageLinks");
	const q = query(usersColReference, where("projectId", "==", projectId));
	const info = await getDocs(q);

	if (!info.empty) {
		return info.docs[0].data().imageUrls;
	} else {
		return null;
	}
}
