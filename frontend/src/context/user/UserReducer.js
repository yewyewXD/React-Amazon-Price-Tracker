export default (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        errMsg: null,
      };

    case "LOGOUT_USER":
      return {
        ...state,
        token: action.payload,
        user: action.payload,
        errMsg: null,
      };

    case "ADD_TRACK":
      return {
        ...state,
        user: {
          ...state.user,
          createdTracks: [...state.user.createdTracks, action.payload],
        },
      };

    case "EDIT_TRACK":
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
    default:
      return state;
  }
};
