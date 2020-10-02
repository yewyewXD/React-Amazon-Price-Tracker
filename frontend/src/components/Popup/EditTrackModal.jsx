import React, { useContext, useState } from "react";
import { UserContext } from "../../context/user/UserState";

export default function EditTrackModal({ handleClose, track }) {
  const { token, errMsg, editTrack } = useContext(UserContext);
  const [trackName, setTrackName] = useState(track.name);
  const [trackExpectedPrice, setTrackExpectedPrice] = useState(
    track.expectedPrice
  );

  function handleEditTrack(e) {
    e.preventDefault();
    const name = trackName;
    const expectedPrice = trackExpectedPrice;
    const id = track._id;

    editTrack(id, name, expectedPrice);

    if (token) {
      handleClose();
    }
  }

  function handleCloseModal() {
    if (token) {
      handleClose();
    }
  }

  return (
    <>
      <h2 className="bold mb-4">Edit your tracked product</h2>
      <form className="form" onSubmit={handleEditTrack}>
        <div className="form-group">
          <label htmlFor="name" className="bold d-block">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Name this track"
            required
            value={trackName}
            onChange={(e) => {
              setTrackName(e.target.value);
            }}
          />
        </div>

        <div className="form-group mb-1">
          <label htmlFor="productUrl" className="bold d-block">
            Expected Price
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter the ideal price for this product"
            required
            value={trackExpectedPrice}
            onChange={(e) => {
              setTrackExpectedPrice(e.target.value);
            }}
          />
        </div>

        {/* Error message */}
        {errMsg && (
          <small className="text-danger d-block mt-1">{errMsg.error}</small>
        )}

        <div className="buttons all-center justify-content-between mt-3">
          <button
            type="button"
            className="btn btn-secondary btn-md"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary btn-md">
            Edit
          </button>
        </div>
      </form>
    </>
  );
}
