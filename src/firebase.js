// Import the functions you need from the SDKs you need
import  {initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPZqt5-VJ-QR0kSZRHvCm-XBfAQjW8deQ",
  authDomain: "crup-registrom-bp.firebaseapp.com",
  projectId: "crup-registrom-bp",
  storageBucket: "crup-registrom-bp.appspot.com",
  messagingSenderId: "580134645871",
  appId: "1:580134645871:web:4e3c70347bc3f6c90cdd9a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
