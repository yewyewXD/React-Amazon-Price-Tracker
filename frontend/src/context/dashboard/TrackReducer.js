export default (state, action) => {
  switch (action.type) {
    case "TRACK_PRODUCT":
      return {
        ...state,
        tracks: [...state.tracks, action.payload],
      };

    default:
      return state;
  }
};
