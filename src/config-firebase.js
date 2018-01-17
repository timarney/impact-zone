import firebase from "firebase";

let db = "";
let key = "";


console.log("env",process.env);

//if (process.env.NODE_ENV === "production") {
  db = process.env.IZ_DB;
  key = process.env.IZ_KEY;
//}

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
