import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PopupBtn from "../Popup/PopupBtn";
import { UserContext } from "../../context/user/UserState";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

export default function AppHeader() {
  const { token, user, logoutUser } = useContext(UserContext);

  if (token) {
    NotificationManager.success(
      `Welcome back, ${user.displayName}!`,
      null,
      3000
    );
  }
  return (
    <header className="header">
      <NotificationContainer />
      {/* {token && (
        <FlashMessage duration={4000}>
          <div className="flash-message w-100 text-center bg-light text-success m-0 py-2">
            {`Welcome back, ${user.email} !`}
          </div>
        </FlashMessage>
      )} */}
      <nav className="navbar navbar-expand-sm navbar-light bg-light py-4">
        <div className="container">
          <Link className="navbar-brand dark bold" to="/">
            TrackerBase
          </Link>

          <div className="buttons all-center">
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
                <span
                  className="dark mx-sm-2 mx-md-3 p-0"
                  role="button"
                  onClick={logoutUser}
                >
                  Logout
                </span>
                <Link
                  className="btn btn-primary btn-sm mx-sm-2 mx-md-3 ml-sm-0 ml-3 p-0"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
