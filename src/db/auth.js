/* eslint-disable */
import { firebase } from "../db/firebaseInit.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, getDoc, setDoc, doc } from "firebase/firestore";

const auth = getAuth(firebase);
const db = getFirestore(firebase);

async function login(email, password) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const docRef = doc(db, "users", userCredential.user.uid);
  const docSnap = await getDoc(docRef);
  var data = docSnap.data();
  localStorage.setItem("user", JSON.stringify(data));
}

async function register(name, username, role, email, password) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  if (role == "Jasa Legalitas") {
    role = "Law Firm";
  }

  await setDoc(doc(db, "users", userCredential.user.uid), {
    uid: userCredential.user.uid,
    name: name,
    email: email,
    username: username,
    role: role,
  });

  await auth.signOut();
}

export { login, register };
