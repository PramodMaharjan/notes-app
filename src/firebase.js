import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyCE_yOkFCbkuL4TbhUNhqHvGP7P3LqdCvQ",
  authDomain: "notes-f29d4.firebaseapp.com",
  projectId: "notes-f29d4",
  storageBucket: "notes-f29d4.appspot.com",
  messagingSenderId: "185054445000",
  appId: "1:185054445000:web:f37554d16c0a5bf722d4fd"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const notesCollection = collection(db, "notes")
