import * as React from "react";
import { render } from "react-dom";

import Main from "./Main";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
