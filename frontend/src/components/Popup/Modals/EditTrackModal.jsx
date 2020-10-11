import React, { useContext, useState } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import FlashMessage from "react-flash-message";

export default function EditTrackModal({ handleClose, track }) {
  const { user, editTrack } = useContext(GlobalContext);
  const [trackName, setTrackName] = useState(track.name);
  const [trackExpectedPrice, setTrackExpectedPrice] = useState(
    track.expectedPrice
  );
  const [hasError, setHasError] = useState(false);

  function handleEditTrack(e) {
    if (hasError) {
      setHasError(false);
    }

    e.preventDefault();
    const name = trackName;
    const expectedPrice = parseFloat(trackExpectedPrice).toFixed(2);
    const id = track._id;

    // validate
    const hasDuplicate =
      user.createdTracks.filter((createdTrack) => createdTrack.name === name)
        .length > 0;
    if (hasDuplicate) {
      setHasError(true);
    } else {
      editTrack(id, name, expectedPrice);
      setHasError(false);
      handleClose();
    }
  }

  function handleCloseModal() {
    handleClose();
  }

  const priceCompare = {
    value:
      // ideal price
      track.actualPrice === track.expectedPrice
        ? "Ideal"
        : track.actualPrice > 0
        ? // price compare
          track.expectedPrice > track.actualPrice
          ? "Cheap"
          : "Costly"
        : // if price is 0
          "No Price",
    style:
      // ideal price
      track.actualPrice === track.expectedPrice
        ? "text-success"
        : // price compare
        track.actualPrice > 0 && track.expectedPrice > track.actualPrice
        ? "text-success"
        : "text-danger",
  };

  return (
    <>
      <h2 className="edit-track-title text-md-left text-center bold mb-4 ">
        Edit your tracked product
      </h2>
      <form className="form" onSubmit={handleEditTrack}>
        <div className="product-image all-center d-md-none mb-3">
          <img
            src={track.image}
            alt={track.name}
            className="track-detail-image"
          />
        </div>

        <div className="form-group mb-md-3 mb-2">
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

        <div className="form-group mb-md-1 mb-2">
          <label htmlFor="expectedPrice" className="bold d-block">
            Expected Price
          </label>
          <input
            type="number"
            step=".01"
            className="form-control"
            placeholder="Enter the ideal price for this product"
            required
            value={trackExpectedPrice}
            onChange={(e) => {
              setTrackExpectedPrice(e.target.value);
            }}
          />
        </div>

        <div className="form-group mb-2 d-md-none">
          <label htmlFor="actualPrice" className="bold d-block">
            Actual Price
          </label>
          <input
            type="number"
            step=".01"
            className="form-control"
            value={track.actualPrice}
            readOnly
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        <div className="form-group mb-1 d-md-none">
          <label htmlFor="priceCompare" className="bold d-block ">
            Price Compare
          </label>
          <input
            type="text"
            className={`form-control ${priceCompare.style}`}
            value={priceCompare.value}
            readOnly
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Error message */}
        {hasError && (
          <FlashMessage duration={5000}>
            <small className="text-danger d-block mt-1">
              Name already exists!
            </small>
          </FlashMessage>
        )}

        <div className="buttons all-center justify-content-between mt-3">
          <button
            type="button"
            className="btn btn-outline-secondary btn-md"
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
