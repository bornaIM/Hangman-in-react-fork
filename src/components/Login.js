// TODO: ovo se moze i inlineat, import React, { useState } from 'react'
import React from 'react'
import { useState} from 'react'
import { useNavigate } from 'react-router-dom'


export default function Login(){
    const [name, setName] = useState("")
    const navigate = useNavigate();
    const navigateToGame = () => {// TODO:odvoji state i funkcije praznom linijom
      localStorage.setItem("name", name);
      navigate("/game");
    } 

    // TODO: mozda bi inputName bilo bolje + imas tipfeler, inputtingName
    const inputingName = (e) => {
        setName(e.target.value)
    }


    return(
        <div className=" d-flex justify-content-center">
            <div className="col-lg-4">
                <h1>Login</h1>
                <div className="input-group mb-3">
                    <input type="text" className="form-control name-input-box" placeholder="Username" aria-label="username" aria-describedby="button-addon2" value={name} onChange={inputingName}></input>
                    {/* TODO: mozes ovo i ovak napisat kao sto si stavio gore onClick={navigateToGame}  */}
                    {name && <button onClick={() => { navigateToGame() }} className="btn btn-outline-secondary" type="button" id="button-addon2">Login</button>}
                </div>
            </div>
        </div>
    )
}

