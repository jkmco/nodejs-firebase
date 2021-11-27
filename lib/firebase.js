// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuXmHYY4P9blwp6gUomYen4SYkqoKx64s",
  authDomain: "tradeblocks-885bd.firebaseapp.com",
  projectId: "tradeblocks-885bd",
  storageBucket: "tradeblocks-885bd.appspot.com",
  messagingSenderId: "942816118632",
  appId: "1:942816118632:web:4ffa09b9bbe961d287b8dd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

/**
 * Converts a firestore document to json
 * @param {DocumentSnapshot} doc
 */
export function firebaseTimestampToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
