import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../../../context/user/UserState";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Loader from "react-loader-spinner";

export default function LoginModal({ handleClose }) {
  const { loginUser, token, errMsg } = useContext(UserContext);
  const [isShowingPw, setIsShowingPw] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailElRef = useRef();
  const pwElRef = useRef();

  function handleLoginUser(e) {
    e.preventDefault();

    if (isShowingPw) {
      setIsShowingPw(false);
    }

    const email = emailElRef.current ? emailElRef.current.value : "";
    const pw = pwElRef.current ? pwElRef.current.value : "";

    loginUser(email, pw);

    if (!token) {
      setIsSubmitting(true);
    }

    if (token) {
      handleClose();
      setIsSubmitting(false);
    }
  }

  function togglePwRevealer() {
    setIsShowingPw(!isShowingPw);
  }

  return (
    <>
      {!token && isSubmitting && (
        <div className="all-center-column">
          <Loader type="Puff" color="#5fb0e5" height={200} width={200} />
          <span className="mt-3 text-center">
            Please wait while we're logging you in
          </span>
        </div>
      )}

      {!isSubmitting && (
        <>
          <h2 className="bold mb-4">Log In</h2>
          <form className="form" onSubmit={handleLoginUser}>
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

            <div className="form-group mb-1">
              <label htmlFor="password" className="bold d-block">
                Password
              </label>
              <input
                type={isShowingPw ? "text" : "password"}
                className="form-control"
                minLength="5"
                required
                ref={pwElRef}
              />

              {/* Password Revealer */}
              <span
                className="pw-revealer"
                onClick={togglePwRevealer}
                style={{ marginTop: "-37px" }}
              >
                {!isShowingPw && <AiFillEye />}
                {isShowingPw && <AiFillEyeInvisible />}
              </span>
            </div>

            {/* Error message */}
            {errMsg && (
              <small className="text-danger d-block mt-1">{errMsg}</small>
            )}

            <button className="btn btn-primary btn-md mt-3">Login</button>
          </form>
        </>
      )}
    </>
  );
}
