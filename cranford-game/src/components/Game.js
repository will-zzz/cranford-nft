import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/database";
import { getAuth, signOut } from "firebase/auth";
import { useState, useEffect } from "react";

export default function Game() {
  let playerId;
  let playerRef;

  let [player1, setPlayer1] = useState({ name: "player1" });
  let [player2, setPlayer2] = useState({ name: "player2" });

  useEffect(() => {
    const allPlayersRef = firebase.database().ref("players");

    allPlayersRef.on("value", (snapshot) => {
      // when change occurs
    });

    allPlayersRef.on("child_added", (snapshot) => {
      // when new node is added
      const addedPlayer = snapshot.val();
      if (addedPlayer.id === playerId) {
        setPlayer1(addedPlayer);
      } else {
        setPlayer2(addedPlayer);
      }
    });

    allPlayersRef.on("child_removed", (snapshot) => {
      // when node is removed
      const removedPlayer = snapshot.val();
      console.log(removedPlayer);
      if (removedPlayer.id !== playerId) {
        setPlayer2({ id: "Bruh", name: "player2" });
        console.log(removedPlayer.id, playerId);
      }
    });

    firebase.auth().onAuthStateChanged((user) => {
      playerId = user.uid;
      playerRef = firebase.database().ref("players/" + playerId);

      playerRef.set({
        id: playerId,
        name: "Cheb",
      });

      playerRef.onDisconnect().remove();
    });
  }, []);

  return (
    <section>
      <h1>{player1.name}</h1>
      <h1>{player2.name}</h1>
    </section>
  );
}
