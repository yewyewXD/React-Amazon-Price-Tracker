import React from "react";
import { Link } from "react-router-dom";
import PopupBtn from "../Popup/PopupBtn";

export default function AppHeader() {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-sm navbar-light bg-light py-4">
        <div className="container">
          <Link className="navbar-brand dark bold" to="/">
            TrackerBase
          </Link>

          <div className="ml-auto all-center">
            <span className="dark mx-sm-2 mx-md-3 p-0">
              <PopupBtn type="login">Login</PopupBtn>
            </span>
            <span className="dark mx-sm-2 mx-md-3 ml-sm-0 ml-3 p-0">
              <PopupBtn type="signUp">Sign Up</PopupBtn>
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
}
