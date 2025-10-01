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
	try {
		console.log("im running");
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
	} catch (err: any) {
		console.error("Error in addUser:", err);
		throw err;
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
	try {
		const usersColReference = collection(db, "users");
		const q = query(usersColReference, where("email", "==", data.email));

		const info = await getDocs(q);

		if (!info.empty) {
			return info.docs[0].data();
		} else {
			return null;
		}
	} catch (err: any) {
		console.error("Error in getUser:", err);
		throw err;
	}
}

export async function createProject(info: any) {
	try {
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
	} catch (err: any) {
		console.error("Error in createProject:", err);
		throw err;
	}
}

export async function addToInProgress(id: string) {
	try {
		const InProgColReference = collection(db, "inProgress");
		await addDoc(InProgColReference, { id });
	} catch (err: any) {
		console.error("Error in addToInProgress:", err);
		throw err;
	}
}

export async function checkInProgress(id: string) {
	try {
		const InProgColReference = collection(db, "inProgress");
		const q = query(InProgColReference, where("id", "==", id));
		const isFinished = await getDocs(q);

		if (isFinished.empty) {
			return true;
		} else {
			return false;
		}
	} catch (err: any) {
		console.error("Error in checkInProgress:", err);
		throw err;
	}
}

export async function removeFromInProgress(id: string) {
	try {
		const InProgColReference = collection(db, "inProgress");
		const q = query(InProgColReference, where("id", "==", id));
		const querySnapshot = await getDocs(q);

		querySnapshot.forEach(async (document) => {
			try {
				await deleteDoc(document.ref);
			} catch (innerErr: any) {
				console.error("Error deleting inProgress document:", innerErr);
			}
		});
	} catch (err: any) {
		console.error("Error in removeFromInProgress:", err);
		throw err;
	}
}

export async function checkUserOwnsProject(
	email: string | unknown,
	id: string
) {
	try {
		const usersColReference = collection(db, "users");
		const q = query(usersColReference, where("email", "==", email));

		const info = await getDocs(q);
		if (info.empty) return false;
		const { projects } = info.docs[0].data();
		return projects.includes(id);
	} catch (err: any) {
		console.error("Error in checkUserOwnsProject:", err);
		throw err;
	}
}

export async function addNewUserProject(
	userId: string | unknown,
	projectId: string
) {
	try {
		const usersColReference = collection(db, "users");
		const q = query(usersColReference, where("email", "==", userId));
		const info = await getDocs(q);
		if (info.empty) throw new Error("User not found");
		const userDocRef = doc(usersColReference, info.docs[0].id);

		await updateDoc(userDocRef, {
			projects: arrayUnion(projectId),
		});
	} catch (err: any) {
		console.error("Error in addNewUserProject:", err);
		throw err;
	}
}

export async function addProjectSceneContents(content: {}, projectId: string) {
	try {
		const usersColReference = collection(db, "projects");
		const userDocRef = doc(usersColReference, projectId);

		await updateDoc(userDocRef, {
			scenes: arrayUnion(content),
		});
	} catch (err: any) {
		console.error("Error in addProjectSceneContents:", err);
		throw err;
	}
}

export async function getProjectSceneInfo(projectId: string) {
	try {
		console.log("i have been called");
		const usersColReference = collection(db, "projects");
		const userDocRef = doc(usersColReference, projectId);

		const data = await getDoc(userDocRef);

		console.log(data.data());
		return data.data();
	} catch (err: any) {
		console.error("Error in getProjectSceneInfo:", err);
		throw err;
	}
}

export async function addImageLinksToUserProject(
	links: Array<string>,
	projectId: string
) {
	try {
		const usersColReference = collection(db, "imageLinks");
		await addDoc(usersColReference, {
			projectId: projectId,
			imageUrls: links,
		});
	} catch (err: any) {
		console.error("Error in addImageLinksToUserProject:", err);
		throw err;
	}
}

export async function getProjectImageLinks(projectId: string) {
	try {
		const usersColReference = collection(db, "imageLinks");
		const q = query(usersColReference, where("projectId", "==", projectId));
		const info = await getDocs(q);

		if (!info.empty) {
			return info.docs[0].data().imageUrls;
		} else {
			return null;
		}
	} catch (err: any) {
		console.error("Error in getProjectImageLinks:", err);
		throw err;
	}
}
