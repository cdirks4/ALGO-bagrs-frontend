// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getStorage, ref } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIRE_API,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firebaseApp = getApp();
const storage = getStorage(firebaseApp, 'gs://products-bucket');

const db = getFirestore(app);

// Get a list of cities from your database
async function getCities(db) {
	const citiesCol = collection(db, 'cities');
	const citySnapshot = await getDocs(citiesCol);
	const cityList = citySnapshot.docs.map((doc) => doc.data());
	return cityList;
}

// Points to the root reference
const storageRef = ref(storage);

// Points to 'images'
const imagesRef = ref(storageRef, 'images');

// Points to 'images/space.jpg'
// Note that you can use variables to create child values
const fileName = 'space.jpg';
const spaceRef = ref(imagesRef, fileName);

// File path is 'images/space.jpg'
const path = spaceRef.fullPath;

// File name is 'space.jpg'
const name = spaceRef.name;

// Points to 'images'
const imagesRefAgain = spaceRef.parent;
export default app;
