import React from "react";
import axios from "axios";

export default function TrackBar() {
  function handlePostURL() {
    console.log("tracking");
    axios.post("http://localhost:5000/track", {
      url: "www",
      price: 500,
    });
  }

  return (
    <div>
      <div className="form-row">
        <div className="col-4">
          <input type="text" className="form-control" />
        </div>
        <button
          className="btn btn-secondary btn-large py-1"
          onClick={handlePostURL}
        >
          Track
        </button>
      </div>
    </div>
  );
}
