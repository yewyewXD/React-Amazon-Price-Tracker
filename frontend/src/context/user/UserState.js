import React, { createContext, useReducer, useEffect } from "react";
import UserReducer from "./UserReducer";
import axios from "axios";

// Initial state
const initialState = {
  token: null,
  user: null,
  errMsg: null,
  notification: null,
  isTracking: true,
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

      const notification = {
        type: "success",
        message: `Welcome back, ${user.displayName}!`,
      };

      dispatch({
        type: "LOGIN_USER",
        payload: { token, user, notification },
      });

      setTimeout(() => {
        dispatch({
          type: "CLEAR_LOGS",
          payload: null,
        });
      }, 100);
    } catch (err) {
      dispatch({
        type: "LOG_ERROR_MESSAGE",
        payload: { message: err.response.data, notification: null },
      });
      setTimeout(() => {
        dispatch({
          type: "CLEAR_LOGS",
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
        payload: { message: err.response.data, notification: null },
      });
      setTimeout(() => {
        dispatch({
          type: "CLEAR_LOGS",
          payload: null,
        });
      }, 3000);
    }
  }

  function logoutUser() {
    localStorage.removeItem("auth-token");

    const notification = {
      type: "success",
      message: `Successfully logged out!`,
    };

    dispatch({
      type: "LOGOUT_USER",
      payload: { notification },
    });

    setTimeout(() => {
      dispatch({
        type: "CLEAR_LOGS",
        payload: null,
      });
    }, 100);
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

      const notification = {
        type: "success",
        message: `New product added!`,
      };

      dispatch({
        type: "ADD_TRACK",
        payload: { track: res.data.data, notification },
      });
    } catch {
      const notification = {
        type: "error",
        message: "Action failed, please contact host",
      };

      dispatch({
        type: "LOG_ERROR_MESSAGE",
        payload: { message: null, notification },
      });

      setTimeout(() => {
        dispatch({
          type: "CLEAR_LOGS",
          payload: null,
        });
      }, 100);
    }
  }

  async function editTrack(id, name, expectedPrice) {
    try {
      const tracks = state.user.createdTracks;
      const editedTrack = tracks.filter((track) => track._id === id);
      editedTrack[0].name = name;
      editedTrack[0].expectedPrice = expectedPrice;
      const prevTracks = tracks.filter((track) => track._id !== id);
      const newTracks = [...editedTrack, ...prevTracks];

      await axios.post(
        `http://localhost:5000/api/dashboard/track/${id}`,
        {
          name,
          expectedPrice,
        },
        { headers: { "user-auth-token": state.token } }
      );

      // console.log(res.data);

      dispatch({
        type: "UPDATE_TRACKS",
        payload: newTracks,
      });
    } catch {
      const notification = {
        type: "warning",
        message: "Error detected, please contact host",
      };

      dispatch({
        type: "LOG_ERROR_MESSAGE",
        payload: { message: null, notification },
      });

      setTimeout(() => {
        dispatch({
          type: "CLEAR_LOGS",
          payload: null,
        });
      }, 100);
    }
  }

  async function deleteTracks(tracks) {
    try {
      const trackIds = tracks.map((track) => track._id);

      // backend update
      await axios.post(
        `http://localhost:5000/api/dashboard/delete/tracks`,
        { trackIds },
        { headers: { "user-auth-token": state.token } }
      );
      // console.log(res.data);

      // frontend update
      const newTracks = state.user.createdTracks;
      tracks.forEach((track) => {
        const index = newTracks.indexOf(track);
        if (index > -1) {
          newTracks.splice(index, 1);
        }
      });
      // console.log(newTracks);

      dispatch({
        type: "UPDATE_TRACKS",
        payload: newTracks,
      });
    } catch {
      const notification = {
        type: "warning",
        message: "Error detected, please contact host",
      };

      dispatch({
        type: "LOG_ERROR_MESSAGE",
        payload: { message: null, notification },
      });

      setTimeout(() => {
        dispatch({
          type: "CLEAR_LOGS",
          payload: null,
        });
      }, 100);
    }
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
      console.log(err.response.data);
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
        notification: state.notification,
        isTracking: state.isTracking,
        loginUser,
        registerUser,
        logoutUser,
        addTrack,
        editTrack,
        deleteTracks,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
