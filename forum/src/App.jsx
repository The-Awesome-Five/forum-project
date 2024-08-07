import {useEffect, useState} from 'react'
import './App.css'
import {createElement, getElement} from "./firebase/firebase-funcs.js";
import { Routes, Route } from 'react-router-dom';
import HeaderBar from "./components/headerBar/HeaderBar.jsx";
import Register from './auth/Register.jsx';

function App() {
  const [elements, setElements] = useState({});

  useEffect(() => {
    const fetchElements = async () => {
      const elems = await getElement('Roles');
      setElements(elems);
    };

    fetchElements();
  }, []);

  return (
    <>
      <HeaderBar />
      <Routes>
        <Route path="/" element={<Register />} />
        {/* <Route path="/" element={<Home />} />
        <Route path="/latest" element={<Latest />} />
        <Route path="/top" element={<Top />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </>
  );
}

export default App
