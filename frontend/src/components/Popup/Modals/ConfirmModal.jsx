import React, { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalState";

export default function ConfirmModal({
  type,
  handleClose,
  selectedTracks,
  setSelectedTracks,
}) {
  const { deleteTracks, multiTrack } = useContext(GlobalContext);

  function handleDeleteTrack(e) {
    e.preventDefault();
    deleteTracks(selectedTracks);
    setSelectedTracks([]);
    handleClose();
  }

  function handleMultiTrack() {
    multiTrack();
    handleClose();
  }

  return (
    <>
      <h2 className="bold mb-4 text-center">Please confirm your action</h2>
      <div className="buttons all-center mt-3">
        <button
          type="button"
          className="btn btn-outline-secondary btn-md mx-2"
          onClick={handleClose}
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
          <button
            type="submit"
            className="btn btn-info btn-md mx-2"
            onClick={handleMultiTrack}
          >
            Multi-track
          </button>
        )}
      </div>
    </>
  );
}
