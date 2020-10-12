import React, { useContext, useState } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Loader from "react-loader-spinner";

export default function LoginModal({ handleClose }) {
  const { loginUser, token, errMsg, userLoading } = useContext(GlobalContext);
  const [isShowingPw, setIsShowingPw] = useState(false);

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  function handleLoginUser(e) {
    e.preventDefault();

    loginUser(email, pw);

    if (token) {
      handleClose();
    }
  }

  function togglePwRevealer() {
    setIsShowingPw(!isShowingPw);
  }

  function handleGuestLogin() {
    const email = "tester@mail.com";
    const pw = "tester";

    loginUser(email, pw);

    if (token) {
      handleClose();
    }
  }

  return (
    <>
      {!token && userLoading && (
        <div className="all-center-column">
          <Loader type="Puff" color="#5fb0e5" height={200} width={200} />
          <span className="mt-3 text-center">
            Please wait while we're logging you in
          </span>
        </div>
      )}

      {!userLoading && (
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={pw}
                onChange={(e) => setPw(e.target.value)}
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

            <div className="login-buttons mt-3">
              <button className="btn btn-primary btn-md mr-3">Login</button>
              <small role="button" onClick={handleGuestLogin}>
                <u>Use guest account</u>
              </small>
            </div>
          </form>
        </>
      )}
    </>
  );
}
