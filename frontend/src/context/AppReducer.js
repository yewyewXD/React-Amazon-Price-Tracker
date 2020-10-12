export default (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        errMsg: null,
        notification: action.payload.notification,
      };

    case "LOGOUT_USER":
      return {
        ...state,
        token: null,
        user: null,
        errMsg: null,
        notification: action.payload.notification,
      };

    case "UPDATE_USER_LOADING":
      return {
        ...state,
        userLoading: action.payload,
      };

    case "ADD_TRACK":
      return {
        ...state,
        user: {
          ...state.user,
          createdTracks: [action.payload.data, ...state.user.createdTracks],
        },
        notification: action.payload.notification,
        isTracking: false,
      };

    case "UPDATE_TRACKS":
      return {
        ...state,
        user: {
          ...state.user,
          createdTracks: action.payload.data,
        },
        notification: action.payload.notification,
      };

    case "MULTI_TRACK":
      return {
        ...state,
        user: {
          ...state.user,
          createdTracks: action.payload.data,
        },
        notification: action.payload.notification,
        isTracking: false,
      };

    case "LOG_ERROR_MESSAGE":
      return {
        ...state,
        errMsg: action.payload.message,
        notification: action.payload.notification,
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
