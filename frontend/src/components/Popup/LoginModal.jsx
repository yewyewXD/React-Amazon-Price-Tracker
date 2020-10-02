import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../../context/user/UserState";
import FlashMessage from "react-flash-message";

export default function LoginModal({ handleClose }) {
  const { loginUser, token, errMsg } = useContext(UserContext);

  const emailElRef = useRef();
  const pwElRef = useRef();

  function handleLoginUser(e) {
    e.preventDefault();
    const email = emailElRef.current ? emailElRef.current.value : "";
    const pw = pwElRef.current ? pwElRef.current.value : "";

    // Validation
    loginUser(email, pw);

    if (token) {
      handleClose();
    }
  }

  return (
    <>
      <h2 className="bold mb-4">Log In</h2>
      <form onSubmit={handleLoginUser}>
        <div className="form-group">
          <label htmlFor="email" className="bold d-block">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            required
            ref={emailElRef}
          />
        </div>

        <div className={`form-group mb-1`}>
          <label htmlFor="password" className="bold d-block">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            minLength="5"
            required
            ref={pwElRef}
          />
        </div>

        {/* Error message */}
        {errMsg && (
          <small className="text-danger d-block mt-1">{errMsg.error}</small>
        )}

        <button className="btn btn-primary btn-md mt-3">Login</button>
      </form>
    </>
  );
}
