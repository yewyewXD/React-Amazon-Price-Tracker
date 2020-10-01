import React from "react";

export default function SignUpModal() {
  return (
    <>
      <h2 className="bold mb-4">Sign Up</h2>
      <form action="">
        <div className="form-group">
          <label htmlFor="email" className="bold d-block">
            Email
          </label>
          <input type="text" className="form-control" />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="bold d-block">
            Password
          </label>
          <input type="password" className="form-control" />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="bold d-block">
            Confirm Password
          </label>
          <input type="password" className="form-control" />
        </div>

        <button className="btn btn-primary btn-md mt-4">Sign Up</button>
      </form>
    </>
  );
}
