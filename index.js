import React from "react"
import ReactDOM from "react-dom/client"
import App from "./src/app"
import {BrowserRouter as Router} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));
// ovo se moze malo ljepse napisat :D, pazi ovo 
// https://www.youtube.com/watch?v=5s57C7leXc4
// mozes si o tome malo i procitat na sluzbenoj dokumentaciji https://reactrouter.com/en/main/routers/picking-a-router (to on gleda)
root.render(
    <Router>
        <App />
    </Router>
)