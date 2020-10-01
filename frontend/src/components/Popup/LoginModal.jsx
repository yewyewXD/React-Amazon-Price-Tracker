import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../../context/user/UserState";
import FlashMessage from "react-flash-message";

export default function LoginModal({ handleClose }) {
  const { loginUser, token } = useContext(UserContext);
  const [hasError, setHasError] = useState(false);

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
    } else {
      setHasError(true);
      setTimeout(() => {
        setHasError(false);
      }, 3000);
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

        <div className={`form-group ${hasError && "mb-1"}`}>
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

        {hasError && (
          <FlashMessage>
            <small className="text-danger">User credential is not valid!</small>
          </FlashMessage>
        )}

        <button className="btn btn-primary btn-md mt-3">Login</button>
      </form>
    </>
  );
}
