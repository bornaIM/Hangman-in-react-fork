import React from 'react'
import axios from 'axios'
import CreateQuoteMask from './CreateQuoteMask'
import {useNavigate} from 'react-router-dom'
import IsALetter from './IsALetter'

// TODO: pazite si na poredak varijabli i importova, importovi idu ispod jer nisu logicni vezani za importove.
const baseUrl = "https://type.fit/api/quotes"

// TODO: dosta vam je da style ukljucite u root komponentu, ne treba vam u svakoj komponenti
import "../style"


export default function Game() {
    // TODO: pripazite na imena varijabla, recimo ovdje ime `post` nis ne znaci,
    // bolje bi bilo da se zove npr. fetchedQuotes ili tak nes, ostale varijale ste nazvali ok
    const [post, setPost] = React.useState()
    // TODO: pazite problem, sto bi se desilo da se smanji broj quotova sa 1642 u npr 1000
    // mislim da bi se nes skrsilo, a bilo bi jako tesko za skuzit sto i zasto
    const [randomIndex, setRandomIndex] = React.useState(randomIntFromInterval(0, 1642))
    const [maskedQuote, setMaskedQuote] = React.useState("")
    const [currLetter, setCurrLetter] = React.useState("")
    const [guessedLetters, setGuessedLetters] = React.useState("")
    const [errors, setErrors] = React.useState(0)
    const [alert, setAlert] = React.useState("")
    const navigate = useNavigate();

    // TODO: Na tragu onoga sto sam napisao gore, malo treba ovaj algoritam prepravit
    // Sugestija, fetchajte sve quotove, iz tog arraya uzmete jedan na random i spremite ga u state.
    // Efektivno ste si ubili 2 varijable u stateu koje vam ne trebaju (post i randomIndex), a kad vam treba quote samo ga svuda referencirate
    // preko nove state varijable, recimo da se zove samo `pickedQuote` (const [pickedQuote, setPickedQuote] = React.useState(""))
    if (post && !maskedQuote) {
        setMaskedQuote(CreateQuoteMask(post[randomIndex].text, ""))
    } else{
        // TODO: https://reactjs.org/docs/hooks-rules.html rules of hooks prvo pravilo
        // hookovi vam nikad neidu u conditionale, dakle cilj je nac nacin da ovo makne iz if-else-a
        React.useEffect(() => {
            axios.get(baseUrl).then((response) => {
                setPost(response.data)
            })
        }, [])
    }
    
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    function changeCurrLetter(e){
        setCurrLetter(e.target.value)
    }

    function guessSelectedLetter() {
        // TODO: ovdje ima dosta nestanja (za to sam cuo super naziv `if-ologija` hehe :P)
        // uglavnom mozete neke ove elsove pretvorit u early return statement, to ubije potrebu za nestanjem i lakse se malo cita 
        if (IsALetter(currLetter)){
            setAlert("")
            if (!guessedLetters.includes(currLetter.toUpperCase())){
                if (!post[randomIndex].text.toUpperCase().includes(currLetter.toUpperCase())){
                    setErrors((prevValue) => {
                        return prevValue + 1
                    })
                }
                setGuessedLetters((prevValue) => {
                        var newGuessedLetters = prevValue + currLetter.toUpperCase()
                        setCurrLetter("")
                        setMaskedQuote(CreateQuoteMask(post[randomIndex].text, newGuessedLetters))
                        return newGuessedLetters
                })
            } else{
                setAlert("Already guessed!")
                setCurrLetter("")
            }
        } else{
            setAlert("Not a letter!")
            setCurrLetter("")
        }
    }

    function checkWon(currMaskedQuote){
        if (!currMaskedQuote.includes("_") && currMaskedQuote){
            postScore()
            return true
        } else{
            return false
        }
    }

    function detectEnterKeyPress(e){
        if (e.key === 'Enter') {
          guessSelectedLetter()
        }
      }

    function restartGame(){
        setErrors(0)
        setAlert("")
        setRandomIndex(randomIntFromInterval(0, 1642))
        setMaskedQuote("")
        setGuessedLetters("")
        setCurrLetter("")
    }

    function postScore(){
        axios.post("https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores", 
        {
            "quoteId": randomIndex.toString(),
            "length": post[randomIndex].text.length,
            "uniqueCharacters": 8,
            "userName": localStorage.getItem("name"),
            "errors": errors
        }).then(res => console.log("response", res))

        // TODO: e tu mi mozda malo fali neki error managment. Gore imate axios.post i onda then, ne znam koja je bila ideja ali 
        // mozda ne bi bilo lose ovaj localhost stavit u then block, kao da se izvede samo ako post request uspije
        // TODO: druga stvar, ove hardcodirane varijable mozete i nekak izracunat, ok je za testiranje, ali probajte se malo i s tim poigrat
        localStorage.setItem("gameData", JSON.stringify({"duration": 1000, "errors": errors, "id": 1, 
            "length": post[randomIndex].text.length, "quoteId": randomIndex, "uniqueCharacters": 55, "userName": localStorage.getItem("name")}))
    }

    // TODO: tipfeler
    const navigateToSocreboard = () => {
        navigate("/scoreboard")
    } 
    return(
        <div className="game">
            <h1>Play hangman!</h1>
            {/* TODO: 2 (3 ako nema errora dolje) <br> taga nisu bas najelegntniji nacin za ovo napravit, 
                postoje i bolji (hint, opcija 1: margin ili padding, opcija 2 flexbox) 
            */}
            <br></br>
            <br></br>
            {(alert)? <p className="alert-text">{alert}</p> : <br></br>} 

            <div className="col-lg-4">
                <div className="input-group mb-3">
                    <input className="form-control" placeholder="Type a letter" aria-label="type a letter" aria-describedby="button-addon2" value={currLetter} type="text" onChange={changeCurrLetter} onKeyDown={detectEnterKeyPress} maxLength={1}></input>
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={guessSelectedLetter}>Select letter</button>
                </div>
            </div>
            <p> Used letters: {guessedLetters} </p>
            <p>Errors: {errors}</p>

            <p className="quote" name="quote">{maskedQuote}</p>
            
            <button type="button" className="btn btn-outline-secondary" onClick={restartGame}>New quote</button>
            {checkWon(maskedQuote) && <button type="button" className="btn btn-outline-secondary" onClick={navigateToSocreboard}>Go to scoreboard</button>}
        </div>
    )
}