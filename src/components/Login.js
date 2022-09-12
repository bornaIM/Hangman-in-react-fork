import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {useNavigate} from 'react-router-dom'
import "../style"

export default function Login(){
    const [name, setName] = React.useState("")
    const navigate = useNavigate();
    const navigateToGame = () => {
        navigate("/game")
    } 

    function inputingName(e){
        setName(e.target.value)
    }

    function saveName(){
        localStorage.setItem("name", name)
    }

    return(
        <div class=" d-flex justify-content-center">
            
            {/* <input type="text"  value={name} onChange={inputingName}></input>
            <button onClick={() => {navigateToGame(); saveName();}} type="button" class="btn btn-secondary">press to login</button> */}
            
            <div class="col-lg-4">
            <h1>Login</h1>
            <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Username" aria-label="username" aria-describedby="button-addon2" value={name} onChange={inputingName}></input>
            <button onClick={() => {navigateToGame(); saveName();}} class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
            </div>
            </div>
            
        </div>
    )
}

