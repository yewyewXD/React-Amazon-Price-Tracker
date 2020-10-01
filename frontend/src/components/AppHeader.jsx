import React from "react";
import { Link } from "react-router-dom";

export default function AppHeader() {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-sm navbar-light bg-light py-4">
        <div className="container">
          <Link className="navbar-brand dark bold" to="/">
            TrackerBase
          </Link>

          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link className="nav-link dark mx-2" to="/">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link dark mx-2" to="/">
                Sign Up Free
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
