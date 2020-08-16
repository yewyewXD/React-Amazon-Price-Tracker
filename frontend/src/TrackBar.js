import React, { useRef } from "react";
import axios from "axios";

export default function TrackBar() {
  const urlElRef = useRef();
  const emailElRef = useRef();

  function handlePostURL() {
    if (urlElRef.current.value && emailElRef.current.value) {
      const email = emailElRef.current.value;
      const url = urlElRef.current.value;

      // Trim URL
      const trimmedUrl = url.substr(0, url.indexOf("/ref="));

      // Fetch info to backend
      axios.post("http://localhost:5000/track", {
        url:
          trimmedUrl.indexOf("https://") === -1
            ? "https://" + trimmedUrl
            : trimmedUrl,
        minPrice: 10,
        redirect: true,
        email,
      });

      urlElRef.current.value = "";
      emailElRef.current.value = "";
    } else {
      console.log("please enter something");
    }
  }

  return (
    <div>
      <div className="form-row">
        <div className="col-4">
          <input
            type="text"
            className="form-control"
            placeholder="Paste your url here"
            ref={urlElRef}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="col-4">
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email here"
            ref={emailElRef}
          />
        </div>
      </div>
      <button
        className="btn btn-secondary btn-large py-1"
        onClick={handlePostURL}
      >
        Track
      </button>
    </div>
  );
}
