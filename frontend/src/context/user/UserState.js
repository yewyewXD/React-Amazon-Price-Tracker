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
      setTimeout(() => {
        dispatch({
          type: "LOG_ERROR_MESSAGE",
          payload: null,
        });
      }, 3000);
    }
  }

  async function registerUser(displayName, email, password, confirmPassword) {
    try {
      await axios.post("http://localhost:5000/api/user/register", {
        displayName,
        email,
        password,
        confirmPassword,
      });
      // console.log(res.data.data);
      loginUser(email, password);
    } catch (err) {
      dispatch({
        type: "LOG_ERROR_MESSAGE",
        payload: err.response.data,
      });
      setTimeout(() => {
        dispatch({
          type: "LOG_ERROR_MESSAGE",
          payload: null,
        });
      }, 3000);
    }
  }

  function logoutUser() {
    localStorage.removeItem("auth-token");

    dispatch({
      type: "LOGOUT_USER",
      payload: null,
    });
  }

  async function addTrack(userId, trackUrl, name, expectedPrice, token) {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/dashboard/track",
        {
          userId,
          trackUrl,
          name,
          expectedPrice,
        },
        { headers: { "user-auth-token": token } }
      );

      console.log(res.data);

      dispatch({
        type: "ADD_TRACK",
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  function editTrack(id, name, expectedPrice) {
    // const res = await axios.post(
    //   "http://localhost:5000/api/dashboard/track",
    //   {
    //     userId,
    //     trackUrl,
    //     name,
    //     expectedPrice,
    //   },
    //   { headers: { "user-auth-token": token } }
    // );
    // console.log(res.data);

    const tracks = state.user.createdTracks;
    const otherTracks = tracks.filter((track) => track._id !== id);
    const editedTrack = tracks.filter((track) => track._id === id);
    editedTrack[0].name = name;
    editedTrack[0].expectedPrice = expectedPrice;
    const newTracks = [...otherTracks, ...editedTrack];
    console.log(newTracks);

    dispatch({
      type: "EDIT_TRACK",
      payload: newTracks,
    });
  }

  // auto login START--------------------------------------------------------------
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
      console.log(err);
    }
  }

  useEffect(() => {
    checkLoggedIn();
  }, []);
  // auto login END--------------------------------------------------------------

  return (
    <UserContext.Provider
      value={{
        token: state.token,
        user: state.user,
        errMsg: state.errMsg,
        loginUser,
        registerUser,
        logoutUser,
        addTrack,
        editTrack,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
