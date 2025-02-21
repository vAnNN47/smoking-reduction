// App.jsx
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseApp } from "./firebase-config";
import Auth from "./Auth";
import Dashboard from "./Dashboard";

const auth = getAuth(firebaseApp);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

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
