import React, { createContext, useReducer, useEffect } from "react";
import TrackReducer from "./TrackReducer";
import axios from "axios";

// Initial state
const initialState = {
  track: null,
  trackErrMsg: null,
};

export const TrackContext = createContext(initialState);

export const TrackProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TrackReducer, initialState);

  //Actions
  async function trackProduct(userId, trackUrl, name, expectedPrice) {}

  return (
    <TrackContext.Provider
      value={{
        track: state.track,
        trackErrMsg: state.trackErrMsg,
        trackProduct,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
};
