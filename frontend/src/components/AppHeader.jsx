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

          <div className="ml-auto all-center">
            <Link className="nav-link dark mx-sm-2 p-0" to="/">
              Login
            </Link>
            <Link className="nav-link dark mx-sm-2 ml-sm-0 ml-3 p-0" to="/">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
