import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBwoBjUgrMoLJpbk00iONiMTw9l3gqrFUw",
  authDomain: "chat-project-b808c.firebaseapp.com",
  projectId: "chat-project-b808c",
  storageBucket: "chat-project-b808c.appspot.com",
  messagingSenderId: "141554718597",
  appId: "1:141554718597:web:4e4ce8971832a0d4e216ec",
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();  //firebase conexion
const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); // firebase authentication conexion 

export {
  database,
  googleAuthProvider,
  firebase
}