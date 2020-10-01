import React, { createContext, useReducer } from "react";
import UserReducer from "./UserReducer";
import axios from "axios";

// Initial state
const initialState = {
  token: null,
  user: null,
};

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  //Actions

  async function loginUser(email, password) {
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });
      const { token, user } = res.data;

      dispatch({
        type: "LOGIN_USER",
        payload: { token, user },
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: "SERVER_ERROR",
        payload: "Server Error",
      });
    }
  }

  async function checkLoggedIn() {
    const token = localStorage.getItem("auth-token");
    const tokenRes = await axios.post(
      "http://localhost:5000/api/user/tokenIsValid",
      null,
      { headers: { "user-auth-token": token } }
    );
    console.log(tokenRes.data);
  }

  return (
    <UserContext.Provider
      value={{
        token: state.token,
        user: state.user,
        loginUser,
        checkLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
