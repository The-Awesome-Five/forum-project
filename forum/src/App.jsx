import {useEffect, useState} from 'react'
import './App.css'
import {createElement, getElement} from "./firebase/firebase-funcs.js";
import {Route, Router, Routes} from "react-router";
import HeaderBar from "./components/headerBar/headerBar.jsx";

function App() {
  const [elements, setElements] = useState({});

    useEffect(() => {
        getElement('Roles')
            .then(elems => setElements(elems));
    }, []);

  return (

    <Router>
    <HeaderBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/latest" element={<Latest />} />
      <Route path="/top" element={<Top />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </Router>

    // <>
    //   <h1>Testing</h1>
    //     <button onClick={() => createElement('user', 'Roles')}>Create</button>
    // </>
  )
}

export default App
