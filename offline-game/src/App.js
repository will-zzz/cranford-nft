import React from "react";
import { useState, useEffect } from "react";

function App() {
  const [p1health, setp1health] = useState(10);
  const [p2health, setp2health] = useState(10);
  const [turn, setTurn] = useState("p1");
  const [message, setMessage] = useState("Let the game begin!");

  function move(move, player) {
    if (move === "Fart") {
      switch (player) {
        case "p1":
          setp1health(p1health - 5);
          break;
        case "p2":
          if (turn === "p1") {
            setp2health(p2health - 5);
          }
          break;
      }
    } else if (move === "Heal") {
      console.log(move, player);
      switch (player) {
        case "p1":
          if (turn === "p1") {
            setp1health(p1health + 3);
          }
          break;
        case "p2":
          setp2health(p2health + 3);
          break;
      }
    } else if (move === "Spank") {
      switch (player) {
        case "p1":
          setp1health(p1health - 4);
          break;
        case "p2":
          if (turn === "p1") {
            setp2health(p2health - 4);
          }
          break;
      }
      window.alert("SPANKEDDDDDD");
    } else if (move === "Ranford") {
      switch (player) {
        case "p1":
          window.alert("ranford is coming ...");
          window.alert("run.");
          break;
        case "p2":
          if (turn === "p1") {
            window.alert("ranford is coming ...");
            window.alert("run.");
          }
          break;
      }
    }
    setMessage(player + " used " + move);
    setTurn("p2");
  }

  useEffect(() => {
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function delayed() {
      if (p1health <= 0 || p2health <= 0) {
        window.alert("GEM OVER");
      }

      if (turn === "p2") {
        await sleep(5000);
        let index = Math.floor(Math.random() * 4);
        let moves = ["Fart", "Heal", "Spank", "Ranford"];
        let choice = moves[index];
        if (choice === "Heal") {
          move(choice, "p2");
        } else {
          move(choice, "p1");
        }
        setTurn("p1");
      }
    }

    delayed();
  }, [turn]);

  return (
    <div className="min-h-screen bg-cover  bg-[url(https://i.pinimg.com/originals/12/c8/3e/12c83efa4d0baf8aa39a48a40a173da8.jpg)]">
      <div className="flex space-x-96 place-content-center pt-10">
        {/* Player 1 */}
        <div className="">
          <p className="text-6xl font-bold underline text-center text-white">
            Player 1
          </p>
          <img
            className="place-content-center p-10"
            src="https://lh3.googleusercontent.com/wc_bWcKizUiu9Ytj4NU43CRQ_59yZyseX5XgrQiDLw1pYxbh2JbNPhSdUBOUeYTi5ufY6eHgvSRhUGDmqmSUDua_50QejtYVl-wyLIQ=w600"
          ></img>
          <div className="flex justify-center items-center gap-3">
            <button
              className="text-white px-4 py-2 rounded-full bg-slate-700 hover:opacity-80"
              onClick={() => move("Fart", "p2")}
            >
              Fart
            </button>
            <button
              className="text-white px-4 py-2 rounded-full bg-slate-700 hover:opacity-80"
              onClick={() => move("Heal", "p1")}
            >
              Heal
            </button>
            <button
              className="text-white px-4 py-2 rounded-full bg-slate-700 hover:opacity-80"
              onClick={() => move("Spank", "p2")}
            >
              Spank
            </button>
            <button
              className="text-white px-4 py-2 rounded-full bg-slate-700 hover:opacity-80"
              onClick={() => move("Ranford", "p2")}
            >
              Ranford
            </button>
          </div>
          <p className="text-white text-center pt-10 text-xl">
            Health: {p1health}
          </p>
        </div>
        {/* Player 2 */}
        <div className="">
          <p className="text-6xl font-bold underline text-center text-white">
            Player 2
          </p>
          <img
            className="place-content-center p-10"
            src="https://lh3.googleusercontent.com/wc_bWcKizUiu9Ytj4NU43CRQ_59yZyseX5XgrQiDLw1pYxbh2JbNPhSdUBOUeYTi5ufY6eHgvSRhUGDmqmSUDua_50QejtYVl-wyLIQ=w600"
          ></img>
          <p className="text-white text-center pt-10 text-xl">
            Health: {p2health}
          </p>
        </div>
      </div>
      {/* GAME LOG */}
      <div className="text-center text-white text-6xl">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default App;
