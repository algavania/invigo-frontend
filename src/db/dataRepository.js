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
      data["investTypeData"] = typeData;
      var str = typeData.join(", ");
      data["typeData"] = str;

      innovators.push(data);
    })
  );

  return innovators;
}

async function getInnovators(total) {
  var innovators = [];
  var querySnapshot;
  if (total) {
    querySnapshot = await getDocs(
      query(collection(db, "innovators"), limit(total))
    );
  } else {
    querySnapshot = await getDocs(query(collection(db, "innovators")));
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
      data["investTypeData"] = typeData;
      var str = typeData.join(", ");
      data["typeData"] = str;

      var fundingData = [];
      for (var index = 0; index < data["investStep"].length; index++) {
        var type = data["investStep"][index];
        const docRef = doc(db, "fundingTypes", type);
        const docSnap = await getDoc(docRef);
        fundingData.push(docSnap.data()["name"]);
      }
      data["investStepData"] = fundingData;
      var str = fundingData.join(", ");
      data["investData"] = str;

      innovators.push(data);
    })
  );

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
  await Promise.all(
    querySnapshot.docs.map(async (document) => {
      var data = document.data();
      if (data["role"] == "Investor") {
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
        console.log('type data', typeData);
        data["investTypeData"] = typeData;
        var str = typeData.join(", ");
        data.data["typeData"] = str;

        var industryData = [];
        for (index = 0; index < data.data["industries"].length; index++) {
          var type = data.data["industries"][index];
          const docRef = doc(db, "industryCategories", type);
          const docSnap = await getDoc(docRef);
          industryData.push(docSnap.data()["name"]);
        }
        data["industriesData"] = industryData;
      } else if (data["role"] == "Inovator") {
        const docRef = doc(db, "innovators", document.id);
        const docSnap = await getDoc(docRef);
        data["data"] = docSnap.data();

        var typeData = [];
        var index = 0;
        for (index = 0; index < data.data["investType"].length; index++) {
          var type = data.data["investType"][index];
          const docRef = doc(db, "investorTypes", type);
          const docSnap = await getDoc(docRef);
          typeData.push(docSnap.data()["name"]);
        }
        data.data["investTypeData"] = typeData;
        str = typeData.join(", ");
        data.data["typeData"] = str;

        var fundingType = [];
        for (index = 0; index < data.data["investStep"].length; index++) {
          var type = data.data["investStep"][index];
          const docRef = doc(db, "fundingTypes", type);
          const docSnap = await getDoc(docRef);
          fundingType.push(docSnap.data()["name"]);
        }
        data.data["investStepData"] = fundingType;
        str = fundingType.join(", ");
        data.data["fundingType"] = str;

        var industryData = [];
        for (index = 0; index < data.data["industries"].length; index++) {
          var type = data.data["industries"][index];
          const docRef = doc(db, "industryCategories", type);
          const docSnap = await getDoc(docRef);
          industryData.push(docSnap.data()["name"]);
        }
        data["industriesData"] = industryData;

        const ref = collection(db, "innovators", document.id, "legalDocs");
        const snap = await getDocs(ref);
        var listLayanan = [];

        snap.docs.map((doc) => {
          listLayanan.push(doc.data());
        });
        data["legalDocs"] = listLayanan;
      } else {
        const docRef = doc(db, "lawFirms", document.id);
        const docSnap = await getDoc(docRef);

        const ref = collection(db, "lawFirms", document.id, "layanan");
        const snap = await getDocs(ref);
        data["data"] = docSnap.data();
        var listLayanan = [];

        snap.docs.map((doc) => {
          listLayanan.push(doc.data());
        });
        data["listLayanan"] = listLayanan;
      }
      list.push(data);
    })
  );
  if (list.length == 0) {
    throw "No data found";
  } else {
    return list[0];
  }
}

export {
  getInvestors,
  getLawFirms,
  getInnovators,
  getDataByUsername,
};
