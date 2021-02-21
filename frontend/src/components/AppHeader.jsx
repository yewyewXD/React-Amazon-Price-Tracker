import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

export default function AppHeader({ isDashboard }) {
  const { notification } = useContext(GlobalContext);

  if (notification) {
    const type = notification.type;
    const message = notification.message;
    if (type === "info") {
      NotificationManager.info(message, null, 4000);
    } else if (type === "success") {
      NotificationManager.success(message, null, 3000);
    } else if (type === "warning") {
      NotificationManager.warning(message, null, 5000);
    } else if (type === "error") {
      NotificationManager.error(notification.title, message, 6000);
    }
  }

  return (
    <header className="header">
      <>
        <NotificationContainer />

        <nav className="navbar navbar-expand-sm navbar-light bg-light py-4">
          <div className="container">
            <Link className="navbar-brand dark bold" to="/">
              TrackerBase
            </Link>

            <div className="buttons all-center">
              <>
                {!isDashboard && (
                  <Link
                    className="btn btn-primary btn-sm mx-sm-2 mx-md-3 ml-sm-0 ml-3 p-0"
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                )}
              </>
            </div>
          </div>
        </nav>
      </>
    </header>
  );
}
