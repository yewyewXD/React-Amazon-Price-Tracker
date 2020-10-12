import React, { useContext, useRef, useState } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import Loader from "react-loader-spinner";
import FlashMessage from "react-flash-message";

export default function AddTrackModal({ handleClose, open }) {
  const { user, addTrack, isTracking } = useContext(GlobalContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);

  const urlElRef = useRef();
  const nameElRef = useRef();
  const expectedPriceElRef = useRef();

  function handleAddTrack(e) {
    e.preventDefault();
    if (hasError) {
      setHasError(false);
    }

    const url = urlElRef.current.value;
    const name = nameElRef.current.value;
    const expectedPrice = expectedPriceElRef.current.value;

    // Validation
    const hasDuplicate =
      user.createdTracks.filter((createdTrack) => createdTrack.name === name)
        .length > 0;
    if (hasDuplicate) {
      setHasError(true);
    } else {
      setHasError(false);
      // Check and submit
      if (url.indexOf("/ref=") === -1) {
        addTrack(url, name, +expectedPrice);
      } else {
        const trimmedUrl = url.substr(0, url.indexOf("/ref="));
        const finalUrl =
          trimmedUrl.indexOf("https://") === -1
            ? `https://"${trimmedUrl}`
            : trimmedUrl;

        addTrack(finalUrl, name, +expectedPrice);
      }

      setIsSubmitting(true);
    }
  }

  function handleAddDemoLink() {
    urlElRef.current.value =
      "https://www.amazon.com/Betron-Earphones-Headphones-Definition-BlackBerry/dp/B00I3LTQ9O";
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
            Please wait while we are tracking the product
          </span>
        </div>
      )}

      {!isSubmitting && (
        <>
          <h2 className="bold mb-4">Track a new product</h2>

          <form className="form" onSubmit={handleAddTrack}>
            <div className="form-group">
              <label htmlFor="productUrl" className="d-block">
                <span className="bold">Product URL</span>
                <span
                  className="text-decoration-none ml-3"
                  role="button"
                  onClick={handleAddDemoLink}
                >
                  <small>
                    <u>use demo link</u>
                  </small>
                </span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Paste the Amazon product link"
                required
                ref={urlElRef}
              />
            </div>

            <div className="form-group">
              <label htmlFor="name" className="bold d-block">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Name this track"
                required
                ref={nameElRef}
              />
            </div>

            <div className="form-group mb-1">
              <label htmlFor="productUrl" className="bold d-block">
                Expected Price
              </label>
              <input
                type="number"
                step=".01"
                className="form-control"
                placeholder="Enter an ideal price"
                required
                ref={expectedPriceElRef}
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

            <button className="btn btn-primary btn-md mt-3">Track</button>
          </form>
        </>
      )}
    </>
  );
}
