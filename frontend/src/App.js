import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";

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
      <GlobalProvider>
        <Switch>
          <Redirect from="/home" to="/" exact />
          <Route path="/" exact component={HomePage} />
          <Route path="/dashboard" component={DashboardPage} />
        </Switch>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
