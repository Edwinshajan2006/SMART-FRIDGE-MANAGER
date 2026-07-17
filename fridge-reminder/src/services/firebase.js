import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export async function fetchItemsFromFirebase() {
  const snapshot = await get(ref(database, "fridge/items"));
  if (!snapshot.exists()) return [];
  return snapshot.val() || [];
}

export async function saveItemsToFirebase(items) {
  await set(ref(database, "fridge/items"), items);
  return items;
}

export async function clearItemsFromFirebase() {
  await remove(ref(database, "fridge/items"));
  return [];
}
