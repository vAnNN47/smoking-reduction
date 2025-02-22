// Dashboard.jsx
import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

function Dashboard({ user, db }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cigaretteLog, setCigaretteLog] = useState({
    time: "",
    location: "",
    reason: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
      setLoading(false);
    };

    fetchUserData();
  }, [user, db]);

  const formatDateTime = (isoString) => {
    return new Date(isoString).toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const logCigarette = async (e) => {
    e.preventDefault();
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const timestamp = new Date().toISOString();
    await updateDoc(userRef, {
      lastLoggedCigarette: timestamp,
      cigaretteLogs: arrayUnion({
        time: cigaretteLog.time,
        location: cigaretteLog.location,
        reason: cigaretteLog.reason,
        loggedAt: timestamp,
      }),
    });

    setCigaretteLog({ time: "", location: "", reason: "" });
    alert("Cigarette logged successfully!");

    // Refresh user data
    const updatedDoc = await getDoc(userRef);
    if (updatedDoc.exists()) {
      setUserData(updatedDoc.data());
    }
  };

  if (loading) return <p>Loading user data...</p>;

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
      <h1>Welcome, {user.email}</h1>
      {userData ? (
        <div>
          <p>
            <strong>Current Step:</strong> {userData.currentStep}
          </p>
          <p>
            <strong>Streaks:</strong> {userData.streaks} days
          </p>
          <p>
            <strong>Last Logged Cigarette:</strong>{" "}
            {userData.cigaretteLogs && userData.cigaretteLogs.length > 0
              ? formatDateTime(userData.lastLoggedCigarette)
              : "Not logged yet"}
          </p>

          <h2>Smoking History</h2>
          {userData.cigaretteLogs && userData.cigaretteLogs.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {userData.cigaretteLogs.map((log, index) => (
                <li
                  key={index}
                  style={{
                    background: "#f0f0f0",
                    margin: "10px 0",
                    padding: "10px",
                    borderRadius: "8px",
                  }}
                >
                  <strong>{log.time}</strong> at <strong>{log.location}</strong>{" "}
                  - {log.reason} <br />
                  <span style={{ fontSize: "0.9em", color: "gray" }}>
                    ({formatDateTime(log.loggedAt)})
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No smoking logs yet.</p>
          )}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      <h2>Log a Cigarette</h2>
      <form
        onSubmit={logCigarette}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="time"
          value={cigaretteLog.time}
          onChange={(e) =>
            setCigaretteLog({ ...cigaretteLog, time: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={cigaretteLog.location}
          onChange={(e) =>
            setCigaretteLog({ ...cigaretteLog, location: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Reason"
          value={cigaretteLog.reason}
          onChange={(e) =>
            setCigaretteLog({ ...cigaretteLog, reason: e.target.value })
          }
          required
        />
        <button
          type="submit"
          style={{
            background: "#007BFF",
            color: "#fff",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Log Cigarette
        </button>
      </form>
    </div>
  );
}

export default Dashboard;
