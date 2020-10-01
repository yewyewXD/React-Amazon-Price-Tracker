export default (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        token: action.payload,
        user: action.payload,
      };
    default:
      return state;
  }
};
