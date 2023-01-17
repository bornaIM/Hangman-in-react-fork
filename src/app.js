import React from 'react'

import "bootstrap/dist/css/bootstrap.min.css";
import "./style"

import Login from "./components/Login"
import Game from "./components/Game"
import Scoreboard from './components/Scoreboard'

import {Routes, Route} from 'react-router-dom'

export default function App(){

    // TODO: ovaj vanjski div ti tu ne treba
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
