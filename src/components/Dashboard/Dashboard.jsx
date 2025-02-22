// Dashboard.jsx
import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import UserInfo from "./UserInfo";
import SmokingHistory from "./SmokingHistory";
import LogCigaretteForm from "./LogCigaretteForm";

function Dashboard({ user, db, username }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getDoc(doc(db, "users", user.uid));
      setLoading(false);
    };
    fetchData();
  }, [db, user]);

  if (loading) {
    return (
      <div
        className="loading-screen"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <svg className="spinner" viewBox="0 0 50 50" width="50" height="50">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#007BFF"
            strokeWidth="5"
            strokeDasharray="100"
            strokeLinecap="round"
            strokeDashoffset="0"
            transform="rotate(-90 25 25)"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="100"
              to="0"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
    );
  }

  return (
    <div
      className="dashboard"
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Welcome, {username}</h1>
      <UserInfo user={user} db={db} />
      <SmokingHistory user={user} db={db} />
      <LogCigaretteForm user={user} db={db} />
    </div>
  );
}

export default Dashboard;
