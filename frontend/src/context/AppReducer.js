const AppReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_TRACK":
      return {
        ...state,
        user: {
          ...state.user,
          createdTracks: [payload.data, ...state.user.createdTracks],
        },
        notification: payload.notification,
        isTracking: false,
      };

    case "UPDATE_TRACKS":
      return {
        ...state,
        user: {
          ...state.user,
          createdTracks: payload.data,
        },
        notification: payload.notification,
      };

    case "MULTI_TRACK":
      return {
        ...state,
        user: {
          ...state.user,
          createdTracks: payload.data,
        },
        notification: payload.notification,
        isTracking: false,
      };

    case "LOG_ERROR_MESSAGE":
      return {
        ...state,
        errMsg: payload.message,
        notification: payload.notification,
        isTracking: false,
      };

    case "CLEAR_LOGS":
      return {
        ...state,
        errMsg: null,
        notification: null,
        isTracking: true,
      };

    default:
      return state;
  }
};

export default AppReducer;
