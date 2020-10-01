import React, { useContext, useRef } from "react";
import { UserContext } from "../../context/user/UserState";

export default function LoginModal() {
  const { loginUser } = useContext(UserContext);

  const emailElRef = useRef();
  const pwElRef = useRef();

  function handleLoginUser(e) {
    e.preventDefault();
    const email = emailElRef.current ? emailElRef.current.value : "";
    const pw = pwElRef.current ? pwElRef.current.value : "";
    loginUser(email, pw);
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

        <div className="form-group">
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

        <button className="btn btn-primary btn-md mt-4">Login</button>
      </form>
    </>
  );
}
