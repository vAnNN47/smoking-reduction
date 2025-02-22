// LogCigaretteForm.jsx
import React, { useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

function LogCigaretteForm({ user, db }) {
  const [cigaretteLog, setCigaretteLog] = useState({
    time: "",
    location: "",
    reason: "",
  });

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
  };

  return (
    <div>
      <h2>Log a Cigarette</h2>
      <form
        onSubmit={logCigarette}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <label>Set Time</label>
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

export default LogCigaretteForm;
