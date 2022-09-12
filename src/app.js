import React from 'react'

import Login from "./components/Login"
import Game from "./components/Game"
import Scoreboard from './components/ScoreBoard'

import {Routes, Route, useNavigate} from 'react-router-dom'

export default function App(){
    const navigate = useNavigate();

    
    return(
       <div>
        <Routes>
            <Route path="/game" element={<Game/>}></Route>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/scoreboard" element={<Scoreboard/>}></Route>
        </Routes>
       </div>

    )
}
