import React, { createContext, useReducer, useEffect } from "react";
import UserReducer from "./UserReducer";
import axios from "axios";

// Initial state
const initialState = {
  token: null,
  user: null,
  errMsg: null,
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

      const { token, user } = res.data.data;

      // console.log(res);
      localStorage.setItem("auth-token", token);

      dispatch({
        type: "LOGIN_USER",
        payload: { token, user },
      });
    } catch (err) {
      dispatch({
        type: "LOG_ERROR_MESSAGE",
        payload: err.response.data,
      });
    }
  }

  async function checkLoggedIn() {
    try {
      let token = localStorage.getItem("auth-token");

      // if token hasn't been set
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "http://localhost:5000/api/user/tokenIsValid",
        null,
        { headers: { "user-auth-token": token } }
      );

      // get and login user data
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:5000/api/user/", {
          headers: { "user-auth-token": token },
        });

        dispatch({
          type: "LOGIN_USER",
          payload: { token, user: userRes.data },
        });
      }
    } catch (err) {
      dispatch({
        type: "LOG_ERROR_MESSAGE",
        payload: err.response.data,
      });
    }
  }

  async function registerUser(email, password, confirmPassword) {
    try {
      const res = await axios.post("http://localhost:5000/api/user/register", {
        email,
        password,
        confirmPassword,
      });
      console.log(res.data.data);
      loginUser(email, password);
    } catch (err) {
      dispatch({
        type: "LOG_ERROR_MESSAGE",
        payload: err.response.data,
      });
    }
  }

  useEffect(() => {
    checkLoggedIn();
  }, []);

  function logoutUser() {
    localStorage.removeItem("auth-token");

    dispatch({
      type: "LOGOUT_USER",
      payload: null,
    });
  }

  return (
    <UserContext.Provider
      value={{
        token: state.token,
        user: state.user,
        errMsg: state.errMsg,
        loginUser,
        registerUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
