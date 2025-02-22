// App.jsx
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseApp } from "../firebase/firebase-config";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import UsernamePrompt from "../components/Dashboard/UsernamePrompt";
import Dashboard from "../components/Dashboard/Dashboard";
import Auth from "../components/Auth";
import Navbar from "../components/Navbar";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists() && userSnap.data().username) {
          setUsername(userSnap.data().username);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

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

  if (!user) {
    return <Auth />;
  }

  if (!username) {
    return <UsernamePrompt user={user} db={db} onUsernameSet={setUsername} />;
  }

  return (
    <div>
      <Navbar username={username} />
      <Dashboard user={user} db={db} username={username} />
    </div>
  );
}

export default App;
