import "../App.css"

import React from 'react';
import { useSelector } from "react-redux";

import Welcome from "./Welcome";
import Main from "./Main";
import { CreatePlayer } from "./Utilities";

const App = () => {

  const render = useSelector(store => store.render);

  return (
    <div className="App">
      {render === "welcome" && <Welcome /> /* Could a place a Nav bar here :) */}
      {render === "main" && <Main /> }
      {render === "setup" && <CreatePlayer/>}

    </div>
  )
}

export default App;