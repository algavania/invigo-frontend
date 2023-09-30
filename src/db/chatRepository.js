/* eslint-disable */
import { firebase } from "../db/firebaseInit.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

const db = getFirestore(firebase);

async function getChatroom(id) {
  const user = JSON.parse(localStorage.getItem("user"));
  const ref = collection(db, "chatRooms");
  const q = query(
    ref,
    where("user1", "==", id),
    where("user2", "==", user["uid"])
  );
  const q1 = query(
    ref,
    where("user2", "==", id),
    where("user1", "==", user["uid"])
  );
  const s1 = await getDocs(q);
  const s2 = await getDocs(q1);
  var querySnapshot;

  if (s1.docs.length > 0) {
    querySnapshot = s1;
  }

  if (s2.docs.length > 0) {
    querySnapshot = s2;
  }

  var res = {};
  res["id"] = null;
  var list = [];

  if (!querySnapshot) {
    return res;
  }

  for (const doc of querySnapshot.docs) {
    var data = doc.data();
    data["id"] = doc.id;
    list.push(data);
  }

  res = list[0];

  return res;
}

async function sendChat(id, message) {
  const user = JSON.parse(localStorage.getItem("user"));
  const ref = collection(db, "chatRooms");
  const q = query(
    ref,
    where("user1", "==", id),
    where("user2", "==", user["uid"])
  );
  const q1 = query(
    ref,
    where("user2", "==", id),
    where("user1", "==", user["uid"])
  );
  const s1 = await getDocs(q);
  const s2 = await getDocs(q1);
  var querySnapshot;

  if (s1.docs.length > 0) {
    querySnapshot = s1;
  }

  if (s2.docs.length > 0) {
    querySnapshot = s2;
  }

  var list = [];
  var newId = null;
  var idToUse;

  if (!querySnapshot) {
    const colRef = await addDoc(ref, {
      user1: user["uid"],
      user2: id,
      lastChat: message,
      createdAt: serverTimestamp(),
    });
    newId = colRef.id;
    idToUse = colRef.id;
  } else {
    for (const doc of querySnapshot.docs) {
      var data = doc.data();
      data["id"] = doc.id;
      idToUse = doc.id;
      list.push(data);
    }
  }
  const chatRef = collection(db, "chatRooms", idToUse, "chats");
  await addDoc(chatRef, {
    sender: user["uid"],
    mimeType: null,
    isSuccessSent: true,
    fileUrl: null,
    fileName: null,
    deletedAt: null,
    message: message,
    createdAt: serverTimestamp(),
  });
  return newId;
}

async function deleteMessage(chatroomId, messageId) {
  const ref = doc(db, "chatRooms", chatroomId, "chats", messageId);
  await setDoc(ref, { deletedAt: serverTimestamp() });
}

export { getChatroom, sendChat, deleteMessage };
