import React, { useContext, useRef } from "react";
import { UserContext } from "../../../context/user/UserState";

export default function AddTrackModal({ handleClose }) {
  const { user, token, errMsg, addTrack } = useContext(UserContext);

  const urlElRef = useRef();
  const nameElRef = useRef();
  const expectedPriceElRef = useRef();

  function handleAddTrack(e) {
    e.preventDefault();
    const url = urlElRef.current.value;
    const name = nameElRef.current.value;
    const expectedPrice = expectedPriceElRef.current.value;

    // Check if URL is trimmed
    if (url.indexOf("/ref=") === -1) {
      addTrack(user.userId, url, name, +expectedPrice, token);
    } else {
      const trimmedUrl = url.substr(0, url.indexOf("/ref="));
      const finalUrl =
        trimmedUrl.indexOf("https://") === -1
          ? `https://"${trimmedUrl}`
          : trimmedUrl;

      addTrack(user.userId, finalUrl, name, +expectedPrice, token);
    }

    if (token) {
      handleClose();
    }
  }

  return (
    <>
      <h2 className="bold mb-4">Track a new product</h2>
      <form className="form" onSubmit={handleAddTrack}>
        <div className="form-group">
          <label htmlFor="productUrl" className="bold d-block">
            Product URL
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Paste the link of the Amazon product"
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
            className="form-control"
            placeholder="Enter the ideal price for this product"
            required
            ref={expectedPriceElRef}
          />
        </div>

        {/* Error message */}
        {errMsg && (
          <small className="text-danger d-block mt-1">{errMsg.error}</small>
        )}

        <button className="btn btn-primary btn-md mt-3">Track</button>
      </form>
    </>
  );
}
