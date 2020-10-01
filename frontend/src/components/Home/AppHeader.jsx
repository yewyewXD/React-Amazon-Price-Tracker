import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PopupBtn from "../Popup/PopupBtn";
import { UserContext } from "../../context/user/UserState";

export default function AppHeader() {
  const { token } = useContext(UserContext);

  return (
    <header className="header">
      <nav className="navbar navbar-expand-sm navbar-light bg-light py-4">
        <div className="container">
          <Link className="navbar-brand dark bold" to="/">
            TrackerBase
          </Link>

          <div className="ml-auto all-center">
            {!token && (
              <>
                <span className="dark mx-sm-2 mx-md-3 p-0">
                  <PopupBtn type="login">Login</PopupBtn>
                </span>
                <PopupBtn type="signUp">
                  <button className="btn btn-sm btn-primary mx-sm-2 mx-md-3 ml-sm-0 ml-3 p-0">
                    Sign Up
                  </button>
                </PopupBtn>
              </>
            )}

            {token && (
              <>
                <span className="dark mx-sm-2 mx-md-3 p-0" role="button">
                  Logout
                </span>
                <button className="btn btn-primary btn-sm mx-sm-2 mx-md-3 ml-sm-0 ml-3 p-0">
                  Dashboard
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
