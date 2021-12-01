// Helper functions for accessing configs in firestore

import { db } from "../lib/firebase.js";
import {
  doc,
  collection,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";

/**
 * Get all config data
 */
export async function getAllConfigs() {
  const colRef = collection(db, "configs");
  const colSnap = await getDocs(colRef);

  let result = [];

  colSnap.forEach((doc) => {
    const data = doc.data();
    for (let i in data) {
      result.push({ app: doc.id, key: i, value: data[i] });
    }
  });
  return result;
  // return :
  // [
  //   { app: 'fundingrates', key: 'test', value: 100 },
  //   { app: 'fundingrates', key: 'rank', value: [ '1', 'abc', 'ddd' ] },
  //   { app: 'volumeAlert', key: 'time', value: '3m' }
  // ]
}

/**
 * Get config documents with specific config app name
 * @param {string} app
 */
export async function getConfigByApp(app) {
  const docRef = doc(db, "configs", app);
  const docSnap = await getDoc(docRef);

  return docSnap;
}

/**
 * Get config data with specific config app name
 * @param {string} app
 * @param {string} key
 */
export async function getConfigByAppAndKey(app, key) {
  const docRef = doc(db, "configs", app);
  const docSnap = await getDoc(docRef);
  const result = docSnap.data();

  return result[key];
}

/**
 * Upsert config data
 * @param {string} app
 * @param {string} key
 * @param {string} value
 */
export async function upsertConfigValue(app, key, value) {
  const docSnap = await getConfigByApp(app);
  const obj = docSnap.data() ? docSnap.data() : {};

  obj[key] = value;

  try {
    await setDoc(docSnap.ref, obj);
  } catch (err) {
    console.log(`[error | configHelper | upsertConfigValue] : ${err}`);
  }
}

/**
 * delete config data with specific config app name
 * @param {string} app
 * @param {string} key
 */
export async function deleteConfigByAppAndKey(app, key) {
  const docSnap = await getConfigByApp(app);
  const obj = docSnap.data();
  obj[key] = deleteField();

  try {
    await updateDoc(docSnap.ref, obj);
  } catch (err) {
    console.log(`[error | configHelper | deleteConfigByAppAndKey] : ${err}`);
  }
}
