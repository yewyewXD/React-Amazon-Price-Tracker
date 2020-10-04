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

    case "ADD_TRACK":
      return {
        ...state,
        user: {
          ...state.user,
          createdTracks: [action.payload.track, ...state.user.createdTracks],
        },
        notification: action.payload.notification,
      };

    case "UPDATE_TRACKS":
      return {
        ...state,
        user: {
          ...state.user,
          createdTracks: action.payload,
        },
      };

    case "LOG_ERROR_MESSAGE":
      return {
        ...state,
        errMsg: action.payload,
      };

    case "CLEAR_NOTIFICATION":
      return {
        ...state,
        notification: null,
      };

    default:
      return state;
  }
};
