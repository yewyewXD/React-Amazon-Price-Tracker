import React, { useContext } from "react";
import AppHeader from "../components/AppHeader";
import ControlPanel from "../components/Dashboard/ControlPanel";
import UserPanel from "../components/Dashboard/UserPanel";
import PopupBtn from "../components/Popup/PopupBtn";
import { GlobalContext } from "../context/GlobalState";
import { heroBg } from "../images/homeImages";

export default function DashboardPage() {
  const { token } = useContext(GlobalContext);

  if (token) {
    return (
      <>
        <AppHeader isDashboard />

        <main className="dashboard-page all-center flex-sm-row flex-column-reverse">
          <ControlPanel />
          <UserPanel />
        </main>
      </>
    );
  } else {
    // if not logged in
    return (
      <>
        <AppHeader />
        <main className="dashboard-locked-page">
          <section className="dashboard-locked">
            <div
              className="dashboard-locked-background h-100 w-100 all-center"
              style={{ background: `url(${heroBg})` }}
            >
              <div className="container h-100 all-center-column justify-content-sm-around">
                <div className="caption all-center-column">
                  <div className="title bold">Opps, access denied!</div>
                  <div className="subtitle">
                    Please login or create an account to view your dashboard
                  </div>

                  <div className="buttons mt-4 all-center">
                    <PopupBtn type="login">
                      <button className="btn bold btn-outline-secondary btn-md mx-2">
                        Login
                      </button>
                    </PopupBtn>

                    <PopupBtn type="signUp">
                      <button className="btn bold btn-primary btn-md mx-2">
                        Sign up Free
                      </button>
                    </PopupBtn>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }
}
