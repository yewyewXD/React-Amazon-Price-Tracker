import React from "react";
import AppHeader from "../components/AppHeader";
import ControlPanel from "../components/Dashboard/ControlPanel";
import UserPanel from "../components/Dashboard/UserPanel";

export default function DashboardPage() {
  return (
    <>
      <AppHeader isDashboard />

      <main className="dashboard-page all-center flex-sm-row flex-column-reverse">
        <ControlPanel />
        <UserPanel />
      </main>
    </>
  );
}
