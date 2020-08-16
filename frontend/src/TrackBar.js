import React, { useRef, useState } from "react";
import axios from "axios";

export default function TrackBar() {
  const [response, setResponse] = useState(null);
  const urlElRef = useRef();
  const priceElRef = useRef();
  // const emailElRef = useRef();

  function handlePostURL(e) {
    // https://www.amazon.com/Wyze-Indoor-Wireless-Detection-Assistant/dp/B076H3SRXG/ref=sr_1_1?dchild=1&fst=as%3Aoff&pf_rd_i=16225009011&pf_rd_m=ATVPDKIKX0DER&pf_rd_p=82d03e2f-30e3-48bf-a811-d3d2a6628949&pf_rd_r=02C1QKMR01ZJ56B065Q2&pf_rd_s=merchandised-search-4&pf_rd_t=101&qid=1486423355&refinements=p_n_shipping_option-bin%3A3242350011&rnid=493964&s=electronics&sr=1-1
    e.preventDefault();

    // Validation
    if (
      urlElRef.current.value
      // && emailElRef.current.value &&
      // /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      //   emailElRef.current.value)
    ) {
      // const email = emailElRef.current.value;
      const url = urlElRef.current.value;
      const price = priceElRef.current.value;

      // Trim URL
      const trimmedUrl = url.substr(0, url.indexOf("/ref="));

      // Fetch info to backend
      axios
        .post("http://localhost:5000/track", {
          url:
            trimmedUrl.indexOf("https://") === -1
              ? "https://" + trimmedUrl
              : trimmedUrl,
          minPrice: +price,
          // email,
        })
        .then((res) => {
          console.log(res.data);
          setResponse(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      // emailElRef.current.value = "";
      urlElRef.current.value = "";
      priceElRef.current.value = "";
    } else {
      console.log("please enter something");
      setResponse({ message: "Invalid input" });
    }
  }

  return (
    <div>
      <form>
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
        {/* 
        <div className="form-row">
          <div className="col-4">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email here"
              ref={emailElRef}
            />
          </div>
        </div> */}

        <div className="form-row">
          <div className="col-4">
            <input
              type="number"
              className="form-control"
              placeholder="Enter your desired price in USD"
              ref={priceElRef}
            />
          </div>
        </div>
        <button
          className="btn btn-secondary btn-large py-1 mb-5"
          onClick={handlePostURL}
        >
          Track
        </button>
        {response && <h1>{response.message}</h1>}
      </form>
    </div>
  );
}
