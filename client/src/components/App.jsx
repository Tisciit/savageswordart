import "../App.css"

import React from 'react';
import { useSelector } from "react-redux";

import Welcome from "./Welcome";
import Main from "./Main";

const App = () => {

  const render = useSelector(store => store.render);

  return (
    <div className="App">
      {render === "welcome" ? <Welcome /> : ""/* Could place a Nav bar here :) */}
      {render === "main" ? <Main /> : ""}

    </div>
  )
}

export default App;