import {useEffect, useState} from 'react'
import './App.css'
import {createElement, getElement} from "./firebase/firebase-funcs.js";
import {Routes, Route} from 'react-router-dom';
import HeaderBar from "./components/commonComponents/HeaderBar/HeaderBar.jsx";
import {Category} from "./components/commonComponents/CategoryComponent/Category.jsx";
import {Home} from "./views/HomeView/Home.jsx";
import Register from './auth/Register.jsx';
import Login from './auth/Login.jsx';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AppContext } from '../state/app.context.js';
import { getUserDataByUID } from './services/user.service.js';
import { auth } from './firebase/config.js';
import { useLocation, navigate, Navigate } from "react-router-dom";
import { logoutUser } from './services/auth.service.js';
function App() {
    const [elements, setElements] = useState({});

  useEffect(() => {
    const fetchElements = async () => {
      const elems = await getElement('Roles');
      setElements(elems);
    };

    fetchElements();
  }, []);

  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });
  const [user, loading, error] = useAuthState(auth);

  if (appState.user !== user) {
    setAppState({...appState, user });
  }

  useEffect(() => {
    if (!user) return;

    getUserDataByUID(appState.user.uid)
      .then(data => {
        const userData = data[Object.keys(data)[0]];
        setAppState({...appState, userData});
      });
  }, [user]);

  const logout = async () => {
    await logoutUser();
    setAppState({ user: null, userData: null });
    navigate('/login');
  };

    return (

        <>
        <AppContext.Provider value={{ ...appState, setAppState }}>
            <HeaderBar/>
            <Home/>
            <div>
      {user ? (
        <button onClick={() => logout()}>Logout</button>
      ) : (
        <Navigate to="/login" replace />
      )}
      
      <Routes>
        <Route path="/" element={<Home />} />
        {!user && <Route path="/register" element={<Register />} />}
        {!user && <Route path="/login" element={<Login />} />}
        {user && <Route path="/login" element={<Navigate to="/" replace />} />}
                
      {/* <Route path="/latest" element={<Latest />} />
      <Route path="/top" element={<Top />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} /> */}
            </Routes>
            </div>
            </AppContext.Provider>
        </>

        // <>
        //   <h1>Testing</h1>
        //     <button onClick={() => createElement('user', 'Roles')}>Create</button>
        // </>
    )
}

export default App
