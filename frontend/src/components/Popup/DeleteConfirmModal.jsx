import React, { useContext, useState } from "react";
import { UserContext } from "../../context/user/UserState";

export default function DeleteConfirmModal({ handleClose, trackIds }) {
  const { token, deleteTracks } = useContext(UserContext);
  function handleDeleteTrack(e) {
    e.preventDefault();
    deleteTracks(trackIds);
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
            className="btn btn-secondary btn-md mx-2"
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
