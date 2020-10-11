import React, { useContext, useState } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import Loader from "react-loader-spinner";

export default function ConfirmModal({
  type,
  open,
  handleClose,
  selectedTracks,
  setSelectedTracks,
}) {
  const { isTracking, deleteTracks, multiTrack } = useContext(GlobalContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleDeleteTrack(e) {
    e.preventDefault();
    deleteTracks(selectedTracks);
    setSelectedTracks([]);
    handleClose();
  }

  function handleMultiTrack() {
    multiTrack();
    setIsSubmitting(true);
  }

  if (!isTracking && open) {
    handleClose();
    if (isSubmitting) {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {isSubmitting && (
        <div className="all-center-column">
          <Loader type="Puff" color="#5fb0e5" height={200} width={200} />
          <span className="mt-3 text-center">
            Please wait while we are tracking the products
          </span>
        </div>
      )}

      {!isSubmitting && (
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
                Update All
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
}
