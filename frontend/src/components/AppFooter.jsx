import React from "react";
import { AiOutlineMail } from "react-icons/ai";

export default function AppFooter() {
  return (
    <footer className="footer all-center">
      <div className="my-lg-3 my-sm-2 my-3 all-center">
        <span className="bold">TrackerBase</span> &copy; All Rights Reserved
        <a
          className="position-absolute all-center m-0 mr-4 text-decoration-none text-dark"
          role="button"
          href="mailto:yew6933@gmail.com"
          style={{ right: 0 }}
        >
          <small className="m-0">
            <AiOutlineMail className="mr-1" /> Report Problem
          </small>
        </a>
      </div>
    </footer>
  );
}
