import {useEffect, useState} from 'react'
import './App.css'
import {createElement, getElement} from "./firebase/firebase-funcs.js";
import {Routes, Route} from 'react-router-dom';
import HeaderBar from "./components/commonComponents/HeaderBar/HeaderBar.jsx";
import {Category} from "./components/commonComponents/CategoryComponent/Category.jsx";
import {Home} from "./views/HomeView/Home.jsx";
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
            <HeaderBar/>
            <Home/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
              
      {/* <Route path="/latest" element={<Latest />} />
      <Route path="/top" element={<Top />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} /> */}
            </Routes>
        </>

        // <>
        //   <h1>Testing</h1>
        //     <button onClick={() => createElement('user', 'Roles')}>Create</button>
        // </>
    )
}

export default App
