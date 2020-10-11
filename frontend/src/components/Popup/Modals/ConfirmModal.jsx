import React, { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalState";

export default function ConfirmModal({
  type,
  handleClose,
  selectedTracks,
  setSelectedTracks,
}) {
  const { deleteTracks } = useContext(GlobalContext);
  function handleDeleteTrack(e) {
    e.preventDefault();
    deleteTracks(selectedTracks);
    setSelectedTracks([]);
    handleClose();
  }

  function handleCloseModal() {
    handleClose();
  }

  return (
    <>
      <h2 className="bold mb-4 text-center">Please confirm your action</h2>
      {/* <form className="form" onSubmit={handleDeleteTrack}> */}
      <div className="buttons all-center mt-3">
        <button
          type="button"
          className="btn btn-outline-secondary btn-md mx-2"
          onClick={handleCloseModal}
        >
          Cancel
        </button>
        {type === "deleteTrack" && (
          <button
            className="btn btn-danger btn-md mx-2"
            onClick={handleDeleteTrack}
          >
            Delete
          </button>
        )}

        {type === "multiTrack" && (
          <button type="submit" className="btn btn-info btn-md mx-2">
            Multi-track
          </button>
        )}
      </div>
      {/* </form> */}
    </>
  );
}
