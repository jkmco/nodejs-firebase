// Helper functions for accessing configs in firestore
// configs(col)) > configApp(doc) > configKey+configValue(doc)

import { db, firebaseTimestampToJSON } from "../lib/firebase.js";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  addDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

/**
 * Get all configs from firestore
 */
export async function getAllConfigs() {
  const colRef = collection(db, "configs");
  const q = query(colRef, orderBy("app"), orderBy("key"));
  const qSnap = await getDocs(q);

  let result = [];

  qSnap.forEach((doc) => {
    result.push(firebaseTimestampToJSON(doc));
  });

  return result;
}

/**
 * Get config data with specific config app name
 * @param {string} app
 */
export async function getConfigsByApp(appName) {
  const colRef = collection(db, "configs");
  const q = query(colRef, where("app", "==", appName));
  const qSnap = await getDocs(q);

  let result = [];

  qSnap.forEach((doc) => {
    result.push(firebaseTimestampToJSON(doc));
  });

  return result;
}

/**
 * Get config data with specific config app name and config key
 * @param {string} appName {string} key
 */
export async function getConfigValueByAppAndKey(appName, key) {
  const colRef = collection(db, "configs");
  const q = query(colRef, where("app", "==", appName), where("key", "==", key));
  const qSnap = await getDocs(q);

  let result = null;

  qSnap.forEach((doc) => {
    result = doc.data();
  });

  return result;
}

/**
 * update config data with specific config app name and config key
 * @param {string} appName {string} key {any} value
 */
export async function updateConfigValueByAppAndKey(appName, key, value) {
  const colRef = collection(db, "configs");
  const q = query(colRef, where("app", "==", appName), where("key", "==", key));
  const qSnap = await getDocs(q);

  let docRef = null;

  qSnap.forEach((doc) => {
    docRef = doc.ref;
  });

  try {
    await updateDoc(docRef, {
      value: value,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.log(
      `[error | configHelper | updateConfigValueByAppAndKey] : ${err}`
    );
  }
}

/**
 * delete config data with specific config app name and config key
 * @param {string} appName {string} key {any} value
 */
export async function deleteConfigByAppAndKey(appName, key) {
  const colRef = collection(db, "configs");
  const q = query(colRef, where("app", "==", appName), where("key", "==", key));
  const qSnap = await getDocs(q);

  let docRef = null;

  qSnap.forEach((doc) => {
    docRef = doc.ref;
    console.log(docRef);
  });

  try {
    await deleteDoc(docRef);
  } catch (err) {
    console.log(`[error | configHelper | deleteConfigByAppAndKey] : ${err}`);
  }
}

/**
 * create config with app+key+value
 * @param {string} appName {string} key {any} value
 */
export async function createConfigValue(appName, key, value) {
  const colRef = collection(db, "configs");
  const data = {
    app: appName,
    key: key,
    value: value,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  try {
    await addDoc(colRef, data);
  } catch (err) {
    console.log(`[error | configHelper | createConfig] : ${err}`);
  }
}

// module.exports = {
//   getAllConfigs,
//   getConfigsByApp,
//   getConfigValueByAppAndKey,
//   updateConfigValueByAppAndKey,
//   deleteConfigByAppAndKey,
//   createConfigValue,
// };
