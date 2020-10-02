import React, { useContext } from "react";
import { UserContext } from "../context/user/UserState";

export default function DashboardPage() {
  const { token } = useContext(UserContext);

  if (token) {
    return (
      <main>
        <h1>hi from dashboard</h1>
      </main>
    );
  } else {
    return <h1>Please login to view dashboard</h1>;
  }
}
