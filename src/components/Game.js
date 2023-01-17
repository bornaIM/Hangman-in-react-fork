import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import createQuoteMask from '../util/createQuoteMask'
import {useNavigate} from 'react-router-dom'
import isALetter from '../util/isALetter'
import uniqueCharNum from '../util/calculateUniqueCharacters'



const baseUrl = "https://type.fit/api/quotes"
export default function Game() {
    
    const [fechedQuote, setFechedQuote] = useState()
    const [fechedQuoteId, setFechedQuoteId] = useState()
    const [maskedQuote, setMaskedQuote] = useState("")
    const [currLetter, setCurrLetter] = useState("")
    const [guessedLetters, setGuessedLetters] = useState("")
    const [errors, setErrors] = useState(0)
    const [alert, setAlert] = useState("")
    const [startTime, setStartTime] = useState(Date.now())
    const [changeQuoteState, setChangeQuoteState] = useState(0)
    const navigate = useNavigate();
  

    // TODO: e pazi ovo, daj ovu funkciju unutar useEffecta stavi u posebnu funkciju, i onda ju pozovi u useEfectu
    // na taj nacin neces morat hakirat dolje s postavljanjem novog valuea u changeQuoteState, samo pozoves opet istu funkciju i to je to
    useEffect(() => {
        // TODO: razmisli o error handlingu, to se isto moze simulirat, 
        axios.get(baseUrl).then((response) => {
          let quoteId = Math.floor(Math.random() * response.data.length);
          // TODO: tu mozes spremit i quoteId i quote kao jedan objekt, na taj nacin sve je jednom operaciji
          // i nemoze se desit da netko zaboravi pozvat jedno a ne drugo. Npr. dolje kad resetiras game pozoves samo setFechedQuote, ne i setFechedQuoteId
          setFechedQuote(response.data[quoteId]);
          setFechedQuoteId(quoteId);
        })
    }, [changeQuoteState])

    // TODO: ono sto sam ti gore napisao, mozes mozda i ovaj dio ubacit u tu funkciju za fetchanje, 
    if (!maskedQuote && fechedQuote) {
        setMaskedQuote(createQuoteMask(fechedQuote.text, ""))
    }
    
    // TODO: ovo se nigdje ne koristi
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    function changeCurrLetter(e){
        setCurrLetter(e.target.value)
    }

    function guessSelectedLetter() {
        if (!isALetter(currLetter)){
            setAlert("Not a letter!")
            setCurrLetter("")
            return
        }
        if (guessedLetters.includes(currLetter.toUpperCase())){
            setAlert("Already guessed!")
            setCurrLetter("")
            return
        }
        if (!fechedQuote.text.toUpperCase().includes(currLetter.toUpperCase())){
            setAlert("Not in the quote")
            setErrors((prevValue) => {
                return prevValue + 1
            })
        } else{
            setAlert("")
        }

        // TODO: nije bas lijepo da zoves neki setState unutar nekog drugog setStatea, nije u duhu Reacta +
        // mozda moze doc do nekih neocekivanih sideefekata
        // https://stackoverflow.com/questions/71780110/is-it-okey-to-use-side-effects-in-the-usestate-hook-callback
        setGuessedLetters((prevValue) => {
            // TODO: zaboravi na varove, const ili let, varovi nisu dobri jer postoje bolje i novije alternative.
            var newGuessedLetters = prevValue + currLetter.toUpperCase()
            setCurrLetter("")
            setMaskedQuote(createQuoteMask(fechedQuote.text, newGuessedLetters))
            return newGuessedLetters
        })
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
        setMaskedQuote("")
        setGuessedLetters("")
        setCurrLetter("")
        setFechedQuote("")
        setChangeQuoteState((prevValue) => prevValue + 1)
        setStartTime(Date.now())
    }

    // TODO: opet tu postoji problem, sto ako nema name-a u localStorageu
    // TODO: isto tako u objektu nemoras propertije pisat s navodnicima ako je jedna rijec, ovo ti je valjano:
    // {
    //  quoteId: 'neki value',
    //  "quote ID": 'neki drugi value
    // }
    function postScore() {
        // TODO: dodaj neki error handling
        axios.post("https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores", 
        {
            "quoteId": fechedQuoteId,
            "length": fechedQuote.text.length,
            "uniqueCharacters": uniqueCharNum(fechedQuote.text),
            "userName": localStorage.getItem("name"),
            "errors": errors
        }).then(
            res => console.log("response", res),
            localStorage.setItem("gameData", JSON.stringify({"duration": (Date.now() - startTime) / 1000, "errors": errors, "id": fechedQuoteId, 
            "length": fechedQuote.text.length, "quoteId": fechedQuoteId, "uniqueCharacters": uniqueCharNum(fechedQuote.text), "userName": localStorage.getItem("name")})))
    }

    const navigateToScoreboard = () => {
        navigate("/scoreboard")
    } 
    return(
        <div className="game">
            <h1>Play hangman!</h1>
            <p> Used letters: {guessedLetters} </p>
            <p>Errors: {errors}</p>
            <div className="gallows">
                <div className="horizontal-part"></div>
                <div className="vertical-part"></div>
                <div className="base"></div>
            </div>
            <div className="hangman">
                {(errors >= 1) && <div className="rope"></div>}
                {(errors >= 1) && <div className="head"></div>}
                {(errors >=2) && <div className="body"></div>}
                {(errors >= 3) && <div className="first-arm"></div>}
                {(errors >= 4) && <div className="second-arm"></div>}
                {(errors >= 5) && <div className="first-leg"></div>}
                {(errors >= 6) && <div className="second-leg"></div>}
            </div>
            {(alert) && <p className="alert-text">{alert}</p>} 
            <div className="col-lg-4 input-and-button"> 
                <div className="input-group mb-3">
                    {/* predugacka linija, obicno ako je kratka linija ostavi skupa, ali ako je ovak dugacka onda rade podijeli u vise redaka, pazi ovo */}
                    {/* <input
                        className="form-control character-input-box"
                        placeholder="Type a letter"
                        aria-label="type a letter"
                        aria-describedby="button-addon2"
                        value={currLetter}
                        type="text"
                        onChange={changeCurrLetter}
                        onKeyDown={detectEnterKeyPress}
                        maxLength={1}
                    ></input> */}
                    <input className="form-control character-input-box" placeholder="Type a letter" aria-label="type a letter" aria-describedby="button-addon2" value={currLetter} type="text" onChange={changeCurrLetter} onKeyDown={detectEnterKeyPress} maxLength={1}></input>
                    <button className="btn btn-outline-secondary center-element" type="button" id="button-addon2" onClick={guessSelectedLetter}>Select letter</button>
                </div>
            </div>
            

            <p className="quote" name="quote">{maskedQuote}</p>
            
            <button type="button" className="btn btn-outline-secondary center-element" onClick={restartGame}>New quote</button>
            {checkWon(maskedQuote) && <button type="button" className="btn btn-outline-secondary center-element" onClick={navigateToScoreboard}>Go to scoreboard</button>}
        </div>
    )
}