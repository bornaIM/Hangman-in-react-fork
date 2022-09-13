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
        <div className=" d-flex justify-content-center">
            
            {/* <input type="text"  value={name} onChange={inputingName}></input>
            <button onClick={() => {navigateToGame(); saveName();}} type="button" class="btn btn-secondary">press to login</button> */}
            
            <div className="col-lg-4">
            <h1>Login</h1>
            <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Username" aria-label="username" aria-describedby="button-addon2" value={name} onChange={inputingName}></input>
            <button onClick={() => {navigateToGame(); saveName();}} className="btn btn-outline-secondary" type="button" id="button-addon2">Login</button>
            </div>
            </div>
            
        </div>
    )
}

