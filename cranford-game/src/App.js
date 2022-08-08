import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { signInAnonymously } from "firebase/auth";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import Game from "./components/Game";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "cranford-a3d4f.firebaseapp.com",
  databaseURL: "https://cranford-a3d4f-default-rtdb.firebaseio.com",
  projectId: "cranford-a3d4f",
  storageBucket: "cranford-a3d4f.appspot.com",
  messagingSenderId: "451363533005",
  appId: "1:451363533005:web:3529c288ec5a66f0327984",
  measurementId: "G-M6C0WZ1WQB",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
let playerId;

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    let user = auth.signInWithPopup(provider);
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Gmail</button>
      <button onClick={() => firebase.auth().signInAnonymously()}>
        Anonymous
      </button>
    </div>
  );
}

function SignOutButton() {
  return <button onClick={logout}>Sign Out</button>;
}

function logout() {
  firebase
    .database()
    .ref("players/" + firebase.auth().currentUser.uid)
    .remove();
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("signed out!");
    })
    .catch((error) => {
      console.log(error);
    });
}

function App() {
  const [user] = useAuthState(auth);

  function GameLoader() {
    return (
      <div>
        <SignOutButton />
        <Game />
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header"></header>
      <section>{user ? <GameLoader /> : <SignIn />}</section>
    </div>
  );
}

export default App;
