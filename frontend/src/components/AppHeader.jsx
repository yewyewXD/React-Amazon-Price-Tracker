import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { RiDashboardLine, RiGithubFill, RiMailFill } from "react-icons/ri";
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
              <a
                href="https://github.com/yewyewXD/React-Amazon-Price-Tracker"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="d-sm-inline d-none">Github</span>

                <RiGithubFill
                  fontSize="26"
                  className="d-sm-none dark"
                  title="Github"
                />
              </a>

              <Link to="/contact" className="ml-3 ml-md-4">
                <span className="d-sm-inline d-none">Contact</span>
                <RiMailFill
                  fontSize="26"
                  className="d-sm-none dark"
                  title="Contact Us"
                />
              </Link>

              {!isDashboard && (
                <>
                  <Link
                    className="btn btn-primary btn-sm p-0 ml-3 ml-md-4 d-sm-inline d-none"
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>

                  <Link
                    className="ml-3 d-sm-none text-primary"
                    title="Dashboard"
                  >
                    <RiDashboardLine fontSize="26" />
                  </Link>
                </>
              )}

              {/* mobile view */}
            </div>
          </div>
        </nav>
      </>
    </header>
  );
}
