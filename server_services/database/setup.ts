// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyC9dRaYoNh6yy_Uz4zL44ZebyjU18f9t3I",
	authDomain: "fairytaleai-caa77.firebaseapp.com",
	projectId: "fairytaleai-caa77",
	storageBucket: "fairytaleai-caa77.firebasestorage.app",
	messagingSenderId: "744738929966",
	appId: "1:744738929966:web:7049b78136202013dccebf",
	measurementId: "G-REEMGCF9X9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);


export default db
