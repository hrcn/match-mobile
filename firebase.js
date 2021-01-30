import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCsApclYlQffYFqFDP40_u9l8HZAeQ2_Co",
  authDomain: "messenger-mobile-33768.firebaseapp.com",
  projectId: "messenger-mobile-33768",
  storageBucket: "messenger-mobile-33768.appspot.com",
  messagingSenderId: "48944244020",
  appId: "1:48944244020:web:d32f1742a8c382510f7161"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
