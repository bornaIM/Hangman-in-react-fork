import React from 'react'
// TODO: dosta vam je da bootstrap ukljucite u root komponentu, ne treba vam u svakoj komponenti
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom'

// TODO: dosta vam je da style ukljucite u root komponentu, ne treba vam u svakoj komponenti
import "../style"

export default function Login(){
    const [name, setName] = React.useState("")
    const navigate = useNavigate();
    const navigateToGame = () => {
        navigate("/game")
    } 

    // TODO: e pazite ovo, gore imate lambda funkciju, a tu obicnu funkciju. Probajte se drzat jednog standarda posvuda, ljepse izgleda
    function inputingName(e){
        setName(e.target.value)
    }

    function saveName(){
        localStorage.setItem("name", name)
    }

    // TODO: funkcije navigateToGame i saveName mozete spojit u jednu jer se uvijek zovu zajedno

    return(
        <div className=" d-flex justify-content-center">
            
            {/* <input type="text"  value={name} onChange={inputingName}></input>
            <button onClick={() => {navigateToGame(); saveName();}} type="button" class="btn btn-secondary">press to login</button> */}
            
            <div className="col-lg-4">
            <h1>Login</h1>
            <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Username" aria-label="username" aria-describedby="button-addon2" value={name} onChange={inputingName}></input>
            {name && <button onClick={() => {navigateToGame(); saveName();}} className="btn btn-outline-secondary" type="button" id="button-addon2">Login</button>}
            </div>
            </div>
            
        </div>
    )
}

