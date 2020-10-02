import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { UserProvider } from "./context/user/UserState";
import { TrackProvider } from "./context/dashboard/TrackState";

// styles
import "bootstrap/dist/css/bootstrap.css";
import "./styles/global.scss";
import "./styles/LandingStyles.scss";
import "./styles/DashboardStyles.scss";
import "react-notifications/lib/notifications.css";

// pages
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <TrackProvider>
        <UserProvider>
          <Switch>
            <Redirect from="/home" to="/" exact />
            <Route path="/" exact component={HomePage} />
            <Route path="/dashboard" component={DashboardPage} />
          </Switch>
        </UserProvider>
      </TrackProvider>
    </BrowserRouter>
  );
}

export default App;
