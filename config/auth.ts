// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY_AUTH,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN_AUTH,
  projectId: process.env.PROJECT_ID_AUTH,
  storageBucket: process.env.STORAGE_BUCKET_AUTH,
  messagingSenderId: process.env.MESSAGING_SENDER_ID_AUTH,
  appId: process.env.APP_ID_AUTH,
  measurementId: process.env.MEASUREMENT_ID_AUTH
};

console.log("Firebase Config", firebaseConfig);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
