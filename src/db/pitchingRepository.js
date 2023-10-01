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
  getDoc,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";
const db = getFirestore(firebase);

async function isPitchingExist(investorId, inovatorId) {
  const ref = collection(db, "pitchings");
  const q = query(
    ref,
    where("investorId", "==", investorId, where("inovatorId", "==", inovatorId))
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.length > 0;
}

async function getPitching(investorId, inovatorId) {
  const ref = collection(db, "pitchings");
  const q = query(
    ref,
    where("investorId", "==", investorId),
    where("inovatorId", "==", inovatorId)
  );
  const querySnapshot = await getDocs(q);
  var res = {};
  var list = [];

  for (const doc of querySnapshot.docs) {
    var data = doc.data();
    data["id"] = doc.id;
    list.push(data);
  }

  if (querySnapshot.docs.length > 0) {
    res = list[querySnapshot.docs.length-1];
  }

  return res;
}

async function addPitching(investorId, inovatorId) {
  const ref = collection(db, "pitchings");
  await addDoc(ref, {
    inovatorId: inovatorId,
    investorId: investorId,
    status: "Diproses",
    createdAt: serverTimestamp(),
  });

  const data = {
    senderId: investorId,
    receiverId: inovatorId,
    tag: "Diproses",
    type: "none",
    description:
      "Permintaan pitching telah dikirim. Pantau terus status pitching.",
    createdAt: serverTimestamp(),
  };

  const investorData = {
    senderId: inovatorId,
    receiverId: investorId,
    type: "pitching-request",
    tag: "none",
    description: "Tertarik bekerja sama dengan Anda.",
    createdAt: serverTimestamp(),
  };
  await addNotification(data);
  await addNotification(investorData);
}

async function updatePitching(id, status, inovatorId, investorId) {
  const ref = doc(db, "pitchings", id);
  await updateDoc(ref, { status: status });
  
  const inovatorData = {
    senderId: investorId,
    receiverId: inovatorId,
    type: "notification",
    tag: status,
    description: "Pitching Anda "+status.toLowerCase()+'.',
    createdAt: serverTimestamp(),
  };

  await addNotification(inovatorData);
}

async function addNotification(data) {
  const ref = collection(db, "notifications");
  await addDoc(ref, data);
}

async function getNotifications(userId) {
  const ref = collection(db, "notifications");
  const q = query(
    ref,
    where("receiverId", "==", userId), orderBy('createdAt', 'desc')
  );

  const querySnapshot = await getDocs(q);
  const user = JSON.parse(localStorage.getItem('user'));
  var res = {};
  var list = [];

  if (!querySnapshot) {
    return res;
  }

  await Promise.all(
    querySnapshot.docs.map(async (document) => {
      var data = document.data();
      data["id"] = document.id;

      const docRef = doc(db, "users", data["senderId"]);
      const docSnap = await getDoc(docRef);
      data["userData"] = docSnap.data();
      data["senderName"] = docSnap.data()["name"];
      data["receiverName"] = user['name'];
      data["senderUsername"] = data["userData"]['username'];
      data["date"] = moment(data["createdAt"].toDate()).format('DD/MM/yyyy, HH:mm');
      list.push(data);
    })
  );

  res = list;

  return res;
}

export {
  isPitchingExist,
  getPitching,
  addPitching,
  updatePitching,
  getNotifications,
};
