import React from 'react';
import './app.css';
import Messages from "./components/messages";
import {useMutation} from "urql";

function App() {
    const [_, executeMutation] = useMutation(`
    mutation ($hola : String!) {
  addName(name : $hola)
}`);

    return (
    <div className="App">
      <Messages />
        <button onClick={() => executeMutation({ hola : `${Math.random()}`})}>add name</button>
    </div>
  );
}

export default App;
