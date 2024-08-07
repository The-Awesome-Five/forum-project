import * as Firebase from "./auth.service.js";
import { auth, createUserWithEmailAndPassword } from '../firebase/config.js';

export const registerUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      throw new Error(error.message);
    }
  };

export const loginUser = (user) => {
    return Firebase.loginUser(user);
}

export const logoutUser = (user) => {
    return Firebase.logoutUser(user);
}
