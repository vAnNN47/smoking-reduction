// App.jsx
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseApp } from "./firebase-config";
import Auth from "./Auth";
import Dashboard from "./Dashboard";

const auth = getAuth(firebaseApp);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <svg className="spinner" viewBox="0 0 50 50">
          <circle
            className="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="5"
          ></circle>
        </svg>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="app-container">
      <Dashboard user={user} />
      <button className="logout-button" onClick={() => signOut(auth)}>
        Logout
      </button>
    </div>
  );
}

export default App;
