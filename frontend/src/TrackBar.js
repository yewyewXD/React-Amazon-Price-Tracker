import React, { useRef } from "react";
import axios from "axios";

export default function TrackBar() {
  const urlElRef = useRef();

  function handlePostURL() {
    if (urlElRef.current.value) {
      // Trim URL
      const newString = urlElRef.current.value.slice(8).split("/").slice(0, 4);
      newString.unshift("https:/");
      const url = newString.join("/");

      // Fetch info to backend
      axios.post("http://localhost:5000/track", {
        url: url,
        price: 500,
      });

      urlElRef.current.value = "";
    } else {
      console.log("please enter something");
    }
  }

  return (
    <div>
      <div className="form-row">
        <div className="col-4">
          <input type="text" className="form-control" ref={urlElRef} />
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
