// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBr8ZEVQSqEP0qlq76YPRde4F1fgpuzCqc",
	authDomain: "typehere.firebaseapp.com",
	projectId: "typehere",
	storageBucket: "typehere.appspot.com",
	messagingSenderId: "392956620587",
	appId: "1:392956620587:web:97976e594a6449d3ef5f6e",
	measurementId: "G-F19XH7505G"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)