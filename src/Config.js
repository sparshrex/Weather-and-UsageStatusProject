import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyANd8FIhYqAVgi0zVup8G72__BZwH1Hc18",
  authDomain: "weather-project-8fb7a.firebaseapp.com",
  projectId: "weather-project-8fb7a",
  storageBucket: "weather-project-8fb7a.appspot.com",
  messagingSenderId: "7555386035",
  appId: "1:7555386035:web:85fd785f89e329bc053ec6",
  measurementId: "G-VV1Y2BNSY7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export { auth, provider ,db};
