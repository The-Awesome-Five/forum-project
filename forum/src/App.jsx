import {useEffect, useState} from 'react'
import './App.css'
import {createElement, getElement} from "./firebase/firebase-funcs.js";

function App() {
  const [elements, setElements] = useState({});

    useEffect(() => {
        getElement('Roles')
            .then(elems => setElements(elems));
    }, []);

  return (
    <>
      <h1>Testing</h1>
        <button onClick={() => createElement('user', 'Roles')}>Create</button>
    </>
  )
}

export default App
