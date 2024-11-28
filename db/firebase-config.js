import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBg9o1uv_eBULucRfh8iW1_ClbC4qz2jBQ",
  authDomain: "flow-nba.firebaseapp.com",
  projectId: "flow-nba",
  storageBucket: "flow-nba.appspot.com",
  messagingSenderId: "680075517240",
  appId: "1:680075517240:web:3c3080de24d57e8a6235cd"
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = initializeFirestore(firebaseApp, {
  experimentalForceLongPolling: true,
});
export const storage = getStorage(firebaseApp);

export default db;