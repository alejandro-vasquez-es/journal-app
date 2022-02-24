import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {

	apiKey: "AIzaSyBXcNeTygUYYw9n3ikBkPxhym0IJ-Waj28",
	authDomain: "journal-app-ea3c7.firebaseapp.com",
	projectId: "journal-app-ea3c7",
	storageBucket: "journal-app-ea3c7.appspot.com",
	messagingSenderId: "836857023386",
	appId: "1:836857023386:web:81510e1e0246a953924823"

};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
	db,
	googleAuthProvider,
	firebase
}