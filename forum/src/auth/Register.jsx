import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../state/app.context';
import { getUserDataByUID, createUserID, getUserDataByEmail } from '../services/user.service';
import { registerUser } from '../services/auth.service';
import './Register.css'
import {toast} from "react-toastify";
export default function Register() {
    const [user, setUser] = useState({
      username: '',
      firstName: '',
      lastName: '',
      avatarUrl:'',
      email: '',
      password: '',

    });
    const { setAppState } = useContext(AppContext);
    const navigate = useNavigate();

    const updateUser = (prop) => (e) => {


      setUser((prevUser) => ({

        ...prevUser,
        [prop]: e.target.value,
      }));
    };

    const register = async () => {
      const { username, firstName, lastName, email, password, avatarUrl } = user;

      if (!email || !password || !username || !firstName || !lastName) {
        return toast.error('All fields are required!');
      }

      if (firstName.length < 4 || firstName.length > 32) {
        return toast.error('First name must be between 4 and 32 characters!');
      }

      if (lastName.length < 4 || lastName.length > 32) {
        return toast.error('Last name must be between 4 and 32 characters!');
      }


      try {
        const userFromDB = await getUserDataByUID(username);
        if (userFromDB) {
          return toast.error(`User {${username}} already exists!`);
        }

        const emailInUse = await getUserDataByEmail(email);
        if (emailInUse) {
          return toast.error(`Email {${email}} is already in use!`);
        }

        const credential = await registerUser(email, password);

        await createUserID(username, firstName, lastName, credential.user.uid, email, avatarUrl);
        setAppState({ user: credential.user, userData: credential.user.uid });
          toast.success(`User ${username} has been registered!`);
        navigate('/');
      } catch (error) {
          toast.error(`There has been a problem with the register - ${error}`);
      }
    };

    return (
      <div className='reg-container'>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={updateUser('username')}
        />
        <br/>
        <input
          type="text"
          placeholder="First Name"
          value={user.firstName}
          onChange={updateUser('firstName')}
        />
         <br/>
        <input
          type="text"
          placeholder="Last Name"
          value={user.lastName}
          onChange={updateUser('lastName')}
        />
         <br/>
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={updateUser('email')}
        />
         <br/>
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={updateUser('password')}
        />
         <br/>
        <input
          type="text"
          placeholder="Avatar URL"
          value={user.avatarUrl}
           onChange={updateUser('avatarUrl')}
        />
          <br/>

        <button onClick={register}>Register</button>
      </div>
    );
  }
