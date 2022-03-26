import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {

	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATA_BASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,

};
// const firebaseConfig = {

// 	apiKey: "AIzaSyBXcNeTygUYYw9n3ikBkPxhym0IJ-Waj28",
// 	authDomain: "journal-app-ea3c7.firebaseapp.com",
// 	projectId: "journal-app-ea3c7",
// 	storageBucket: "journal-app-ea3c7.appspot.com",
// 	messagingSenderId: "836857023386",
// 	appId: "1:836857023386:web:81510e1e0246a953924823"

// };

// if (process.env.NODE_ENV === 'test') {

// 	firebase.initializeApp(firebaseConfigTesting);

// } else {

// 	firebase.initializeApp(firebaseConfig);

// }

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
	db,
	googleAuthProvider,
	firebase
}