// Navbar.jsx
import React from "react";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

function Navbar({ username }) {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: "#007BFF",
        color: "white",
      }}
    >
      <span style={{ fontSize: "1.2em", fontWeight: "bold" }}>
        Hello, {username}
      </span>
      <button
        onClick={() => signOut(auth)}
        style={{
          background: "#FF4136",
          color: "white",
          border: "none",
          padding: "8px 12px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
