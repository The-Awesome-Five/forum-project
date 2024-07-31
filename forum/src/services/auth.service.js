import * as Firebase from "./auth.service.js";

export const registerUser = (user) => {
    return Firebase.registerUser(user);
}

export const loginUser = (user) => {
    return Firebase.loginUser(user);
}

export const logoutUser = (user) => {
    return Firebase.logoutUser(user);
}
