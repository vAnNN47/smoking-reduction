// Dashboard.jsx
import React from "react";

function Dashboard({ user }) {
  return (
    <div className="dashboard">
      <h1>Welcome, {user.email}</h1>
      <p>This is your dashboard. Start reducing your smoking habits!</p>
      {/* Extend your app’s functionality here */}
    </div>
  );
}

export default Dashboard;
