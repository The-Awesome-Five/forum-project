import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../state/app.context';
import { getUserDataByUID, createUserID, getUserDataByEmail } from '../services/user.service';
import { registerUser } from '../services/auth.service';
export default function Register() {
    const [user, setUser] = useState({
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
    const { setAppState } = useContext(AppContext);
    const navigate = useNavigate();
  
    const updateUser = (prop) => (e) => {
        console.log(`Updating user: ${prop} = ${e.target.value}`);
      setUser((prevUser) => ({
        
        ...prevUser,
        [prop]: e.target.value,
      }));
    };
  
    const register = async () => {
      const { username, firstName, lastName, email, password } = user;
  
      if (!email || !password || !username || !firstName || !lastName) {
        return alert('All fields are required!');
      }
  
      if (firstName.length < 4 || firstName.length > 32) {
        return alert('First name must be between 4 and 32 characters!');
      }
  
      if (lastName.length < 4 || lastName.length > 32) {
        return alert('Last name must be between 4 and 32 characters!');
      }
  
      console.log("Registering user with:", user);

      try {
        const userFromDB = await getUserDataByUID(username);
        if (userFromDB) {
          return alert(`User {${username}} already exists!`);
        }
  
        const emailInUse = await getUserDataByEmail(email);
        if (emailInUse) {
          return alert(`Email {${email}} is already in use!`);
        }
  
        console.log('beforeCall');
        const credential = await registerUser(email, password);
        console.log('registerUserCalled');
        await createUserID(username, firstName, lastName, credential.user.uid, email);
        setAppState({ user: credential.user, userData: null });
        navigate('/');
      } catch (error) {
        console.error("Registration error:", error);
        alert(error.message);
      }
    };
  
    return (
      <div>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={updateUser('username')}
        />
        <input
          type="text"
          placeholder="First Name"
          value={user.firstName}
          onChange={updateUser('firstName')}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={user.lastName}
          onChange={updateUser('lastName')}
        />
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={updateUser('email')}
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={updateUser('password')}
        />
        <button onClick={register}>Register</button>
      </div>
    );
  }