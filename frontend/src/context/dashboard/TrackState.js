import React, { createContext, useReducer } from "react";
import TrackReducer from "./TrackReducer";
import axios from "axios";

// Initial state
const initialState = {
  tracks: [],
};

export const TrackContext = createContext(initialState);

export const TrackProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TrackReducer, initialState);

  //Actions
  async function trackProduct(userId, trackUrl, name, expectedPrice, token) {
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

      // console.log(res.data);

      dispatch({
        type: "TRACK_PRODUCT",
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function getAllTracks(userId, token) {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/dashboard/tracks",
        {
          userId,
        },
        { headers: { "user-auth-token": token } }
      );

      // console.log(res.data);

      dispatch({
        type: "GET_ALL_TRACKS",
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <TrackContext.Provider
      value={{
        tracks: state.tracks,
        trackErrMsg: state.trackErrMsg,
        trackProduct,
        getAllTracks,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
};
