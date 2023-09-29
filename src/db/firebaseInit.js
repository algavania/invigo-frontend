import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCxujXi7CZTMMJCm8PH_L8-Y27xFuLjKfw",
  authDomain: "invigo-e3431.firebaseapp.com",
  projectId: "invigo-e3431",
  storageBucket: "invigo-e3431.appspot.com",
  messagingSenderId: "221131129633",
  appId: "1:221131129633:web:ebc500f0bfe784543bf460",
  measurementId: "G-5QSNL2DF0L"
};

const firebase = initializeApp(firebaseConfig);

export { firebase };