/* eslint-disable */
import { firebase } from "../db/firebaseInit.js";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  limit,
  where,
} from "firebase/firestore";

const db = getFirestore(firebase);

async function getInvestors(total) {
  var innovators = [];
  var querySnapshot;
  if (total) {
    querySnapshot = await getDocs(
      query(collection(db, "investors"), limit(total))
    );
  } else {
    querySnapshot = await getDocs(query(collection(db, "investors")));
  }

  await Promise.all(
    querySnapshot.docs.map(async (document) => {
      const docRef = doc(db, "users", document.id);
      const docSnap = await getDoc(docRef);
      var data = document.data();
      data["userData"] = docSnap.data();

      var typeData = [];
      for (var index = 0; index < data["investType"].length; index++) {
        var type = data["investType"][index];
        const docRef = doc(db, "investorTypes", type);
        const docSnap = await getDoc(docRef);
        typeData.push(docSnap.data()["name"]);
      }
      var str = typeData.join(", ");
      data["typeData"] = str;

      innovators.push(data);
    })
  );

  console.log("testing", innovators.length);
  return innovators;
}

async function getLawFirms(total) {
  var querySnapshot;
  if (total) {
    querySnapshot = await getDocs(
      query(collection(db, "lawFirms"), limit(total))
    );
  } else {
    querySnapshot = await getDocs(query(collection(db, "lawFirms")));
  }

  const lawFirms = await Promise.all(
    querySnapshot.docs.map(async (document) => {
      const docRef = doc(db, "users", document.id);
      const docSnap = await getDoc(docRef);
      var data = document.data();
      data["typeData"] = "Law Firm";
      data["userData"] = docSnap.data();
      return data;
    })
  );

  return lawFirms;
}

async function getDataByUsername(username) {
  const ref = collection(db, "users");
  const q = query(ref, where("username", "==", username));
  const querySnapshot = await getDocs(q);
  var list = [];
  console.log('testing abc 1');
  await Promise.all(
    querySnapshot.docs.map(async (document) => {
      var data = document.data();
      if (data['role'] == 'Investor') {
        const docRef = doc(db, "investors", document.id);
        const docSnap = await getDoc(docRef);
        data["data"] = docSnap.data();
  
        var typeData = [];
        for (var index = 0; index < data.data["investType"].length; index++) {
          var type = data.data["investType"][index];
          const docRef = doc(db, "investorTypes", type);
          const docSnap = await getDoc(docRef);
          typeData.push(docSnap.data()["name"]);
        }
        var str = typeData.join(", ");
        data.data["typeData"] = str;
      } else if (data['role'] == 'Inovator') {
        const docRef = doc(db, "innovators", document.id);
        const docSnap = await getDoc(docRef);

        var typeData = [];
        var index = 0;
        for (index = 0; index < data["investType"].length; index++) {
          var type = data["investType"][index];
          const docRef = doc(db, "investorTypes", type);
          const docSnap = await getDoc(docRef);
          typeData.push(docSnap.data()["name"]);
        }
        str = typeData.join(", ");
        data["typeData"] = str;

        var fundingType = [];
        for (index = 0; index < data["investStep"].length; index++) {
          var type = data["investStep"][index];
          const docRef = doc(db, "fundingTypes", type);
          const docSnap = await getDoc(docRef);
          fundingType.push(docSnap.data()["name"]);
        }
        str = fundingType.join(", ");
        data["fundingType"] = str;

        data["data"] = docSnap.data();
      } else {
        const docRef = doc(db, "lawFirms", document.id);
        const docSnap = await getDoc(docRef);  
        data["data"] = docSnap.data();
      }
      list.push(data);
    })
  );
  console.log('testing abc');
  console.log('list', list)
  if (list.length == 0) {
    throw 'No data found';
  } else {
    return list[0];
  }
}
export { getInvestors, getLawFirms, getDataByUsername };
