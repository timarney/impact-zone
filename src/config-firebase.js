import firebase from "firebase";

const db = process.env.REACT_APP_IZ_DB;
const key = process.env.REACT_APP_IZ_KEY;

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
