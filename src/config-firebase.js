import firebase from "firebase";

let db = "";
let key = "";

if (process.env.NODE_ENV === "production") {
  db = process.env.db;
  key = process.env.key;
}

const config = {
  firebase: `https://${db}.firebaseio.com/`,
  apiKey: `${key}`,
  authDomain: `${db}.firebaseapp.com`,
  databaseURL: `https://${db}.firebaseio.com`,
  projectId: `${db}`,
  storageBucket: "",
  messagingSenderId: "101206765860"
};

export default firebase.initializeApp(config);
