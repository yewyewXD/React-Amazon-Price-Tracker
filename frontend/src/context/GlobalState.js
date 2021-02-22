import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial state
const initialState = {
  user: { createdTracks: [] },
  errMsg: null,
  notification: null,
  isTracking: true,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function addTrack(trackUrl, name, expectedPrice) {
    try {
      const res = await axios.post("/.netlify/functions/testing", {
        trackUrl,
        name,
        expectedPrice,
      });

      console.log(res.data);

      // console.log(res.data.data);

      // let notification;
      // if (res.data.data.actualPrice === 0) {
      //   notification = {
      //     type: "warning",
      //     message: `Failed to track price, please report to us through the footer of homepage`,
      //   };
      // } else {
      //   notification = {
      //     type: "success",
      //     message: `New product added!`,
      //   };
      // }

      // dispatch({
      //   type: "ADD_TRACK",
      //   payload: { data: res.data.data, notification },
      // });
      setTimeout(() => {
        dispatch({
          type: "CLEAR_LOGS",
          payload: null,
        });
      }, 100);
    } catch {
      console.log("crawling failed");
      const notification = {
        type: "error",
        message: "Track Failed!",
        title: "Please contact host through the footer of the homepage",
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
      const editedTrackName = editedTrack[0].name;
      editedTrack[0].name = name;
      editedTrack[0].expectedPrice = expectedPrice;
      const prevTracks = tracks.filter((track) => track._id !== id);
      const newTracks = [...editedTrack, ...prevTracks];

      await axios.post(`/api/dashboard/track/${id}`, {
        name,
        expectedPrice,
      });

      const notification = {
        type: "info",
        message: `Product "${editedTrackName}" has been edited`,
      };

      dispatch({
        type: "UPDATE_TRACKS",
        payload: { data: newTracks, notification },
      });

      setTimeout(() => {
        dispatch({
          type: "CLEAR_LOGS",
          payload: null,
        });
      }, 100);
    } catch {
      const notification = {
        type: "warning",
        message:
          "Error detected, please report to us through the footer of homepage",
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

  async function deleteTracks(selectedTracks) {
    try {
      if (state.user.email !== "tester@mail.com") {
        // backend update
        await axios.post(`/api/dashboard/delete/tracks`, {
          userId: state.user.userId,
          selectedTracks,
        });
      }

      const notification = {
        type: "success",
        message: `Successfully deleted!`,
      };

      // frontend update
      if (selectedTracks.length === state.user.createdTracks.length) {
        dispatch({
          type: "UPDATE_TRACKS",
          payload: { data: [], notification },
        });
      } else {
        const newTracks = state.user.createdTracks;
        selectedTracks.forEach((selectedTrack) => {
          const index = newTracks.indexOf(selectedTrack);
          if (index > -1) {
            newTracks.splice(index, 1);
          }
        });

        dispatch({
          type: "UPDATE_TRACKS",
          payload: { data: newTracks, notification },
        });
      }

      setTimeout(() => {
        dispatch({
          type: "CLEAR_LOGS",
          payload: null,
        });
      }, 100);
    } catch {
      const notification = {
        type: "warning",
        message:
          "Error detected, please report to us through the footer of homepage",
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

  async function multiTrack() {
    try {
      if (state.user.createdTracks.length > 0) {
        const res = await axios.post("/api/dashboard/multiTrack", {
          userId: state.user.userId,
          createdTracks: state.user.createdTracks,
        });
        // console.log(res.data.data);

        const notification = {
          type: "success",
          message: `All product has been updated!`,
        };
        dispatch({
          type: "MULTI_TRACK",
          payload: { data: res.data.data, notification },
        });
      } else {
        const notification = {
          type: "warning",
          message: `No product is detected!`,
        };
        dispatch({
          type: "LOG_ERROR_MESSAGE",
          payload: { message: null, notification },
        });
      }
      setTimeout(() => {
        dispatch({
          type: "CLEAR_LOGS",
          payload: null,
        });
      }, 100);
    } catch {
      console.log("crawling failed");
      const notification = {
        type: "error",
        message: "Track Failed!",
        title: "Please contact host through the footer of the homepage",
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

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        errMsg: state.errMsg,
        notification: state.notification,
        isTracking: state.isTracking,
        addTrack,
        editTrack,
        deleteTracks,
        multiTrack,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
