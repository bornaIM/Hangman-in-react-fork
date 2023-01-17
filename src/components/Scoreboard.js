// TODO: ovo se moze i inlineat, import React, { useState, useEffect } from 'react'
import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Scoreboard() {
  // TODO: a sto ako gameData ne postoji u localStorageu?
  let gameData = JSON.parse(localStorage.getItem("gameData"));
  const navigate = useNavigate();

  // TODO: inace nije bas neka praksa da se negativni brojevi koriste kao ID-evi
  // npr. https://stackoverflow.com/questions/8927761/why-is-negative-id-or-zero-considered-a-bad-practice
  const [scoreList, setScoreList] = useState([
    { errors: gameData.errors, userName: gameData.userName, id: -1 },
  ]);

  useEffect(() => {
    axios
      .get(
        "https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores"
      )
      .then((response) => {
        setScoreList((oldScoreList) => [...oldScoreList, ...response.data]);
      });
  }, []);

  scoreList.sort((a, b) => a.errors - b.errors);
  // TODO: da se vratim na ono gore s ID-ovima, realno tebi taj ID ni netreba tu. Mozes ovu liniju dolje napisat kao
  // const scoreListItems = scoreList.map((element, index) => (
  // i samo onda umjesto id koristis index
  const scoreListItems = scoreList.map((element) => (
    <li key={element.id}>
      {element.userName} {(100 / (1 + element.errors)).toFixed(0)}
    </li>
  ));
  const navigateToGame = () => { // TODO: empty line gore
    navigate("/game");
  };
  return ( // TODO: empty line gore
    <div>
      <h1>Scoreboard</h1>
      <ol className="scoreboard">{scoreList.length > 1 && scoreListItems}</ol>
      <button
        type="button"
        className="btn btn-outline-secondary center-element"
        onClick={navigateToGame}
      >
        Return to game
      </button>
    </div>
  );
}
