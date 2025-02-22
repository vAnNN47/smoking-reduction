// UsernamePrompt.jsx
import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function UsernamePrompt({ user, db, onUsernameSet }) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUsername = async () => {
      if (!user) return;
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists() && docSnap.data().username) {
        onUsernameSet(docSnap.data().username); // If username exists, set it immediately
      }
      setLoading(false);
    };
    checkUsername();
  }, [user, db, onUsernameSet]);

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, { username });
    onUsernameSet(username); // Redirect to dashboard after setting username
  };

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
      style={{
        textAlign: "center",
        padding: "20px",
        background: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        margin: "50px auto",
      }}
    >
      <h2 style={{ color: "#333", marginBottom: "10px" }}>Set Your Username</h2>
      <p style={{ color: "#666", fontSize: "0.9em", marginBottom: "15px" }}>
        Please choose a username before continuing.
      </p>
      <form
        onSubmit={handleUsernameSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "1em",
          }}
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
            fontSize: "1em",
          }}
        >
          Save Username
        </button>
      </form>
    </div>
  );
}

export default UsernamePrompt;
