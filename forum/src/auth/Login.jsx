import { useContext, useState } from "react"
import { AppContext } from '../state/app.context';
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth.service";
import { getUserByID } from "../services/user.service";
import './Login.css'
import {toast} from "react-toastify";

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { userData, setAppState } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const updateUser = prop => e => {
    setUser({
      ...user,
      [prop]: e.target.value,
    })
  };


  const login = async () => {
    if (!user.email || !user.password) {
      return toast.error('No credentials provided!');
    }

    try {
      const credentials = await loginUser(user.email, user.password);
      const userInfo= await getUserByID(credentials.user.uid)

      setAppState({
        user: credentials.user,
        userData: userInfo,
      });

      toast.success(`You logged in successfully!`)

      navigate(location.state?.from.pathname ?? '/');
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <label htmlFor="email">Email: </label>
      <input value={user.email} onChange={updateUser('email')} type="text" name="email" id="email" /><br /><br />
      <label htmlFor="password">Password: </label>
      <input value={user.password} onChange={updateUser('password')} type="password" name="password" id="password" /><br />
      <button onClick={login}>Login</button>
    </div>
  )
}
