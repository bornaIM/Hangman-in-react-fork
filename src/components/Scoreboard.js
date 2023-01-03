import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

export default function Scoreboard() {
  let gameData = JSON.parse(localStorage.getItem("gameData"));
  const navigate = useNavigate();
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
  const scoreListItems = scoreList.map((element) => (
    <li key={element.id}>
      {element.userName} {(100 / (1 + element.errors)).toFixed(0)}
    </li>
  ));
  const navigateToGame = () => {
    navigate("/game")
} 
  return (
    <div>
      <h1>Scoreboard</h1>
      <ol className="scoreboard">{scoreList.length > 1 && scoreListItems}</ol>
      <button type="button" className="btn btn-outline-secondary center-element" onClick={navigateToGame}>Return to game</button>
    </div>
  );
}
