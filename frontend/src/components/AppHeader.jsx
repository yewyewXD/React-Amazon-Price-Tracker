import React from "react";
import { Link } from "react-router-dom";

export default function AppHeader() {
  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-light bg-light py-4">
        <div className="container">
          <a className="navbar-brand dark" href="/">
            Logo
          </a>

          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link className="nav-link dark" to="/">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link dark" to="/">
                Sign Up Free
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
