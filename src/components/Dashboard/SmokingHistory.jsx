// SmokingHistory.jsx
import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";

function SmokingHistory({ user, db }) {
  const [cigaretteLogs, setCigaretteLogs] = useState([]);

  useEffect(() => {
    const fetchSmokingHistory = async () => {
      if (!user) return;
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setCigaretteLogs(docSnap.data().cigaretteLogs || []);
      }
    };
    fetchSmokingHistory();
  }, [user, db]);

  return (
    <div>
      <h2>Smoking History</h2>
      {cigaretteLogs.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cigaretteLogs.map((log, index) => (
            <li
              key={index}
              style={{
                background: "#f0f0f0",
                margin: "10px 0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <strong>{log.time}</strong> at <strong>{log.location}</strong> -{" "}
              {log.reason}
            </li>
          ))}
        </ul>
      ) : (
        <p>No smoking logs yet.</p>
      )}
    </div>
  );
}

export default SmokingHistory;
