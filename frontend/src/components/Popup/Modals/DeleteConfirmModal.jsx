import React, { useContext } from "react";
import { GlobalContext } from "../../../context/user/GlobalState";

export default function DeleteConfirmModal({
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
      <form className="form" onSubmit={handleDeleteTrack}>
        <div className="buttons all-center mt-3">
          <button
            type="button"
            className="btn btn-outline-secondary btn-md mx-2"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-danger btn-md mx-2">
            Delete
          </button>
        </div>
      </form>
    </>
  );
}
