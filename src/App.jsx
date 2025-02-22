// App.jsx
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseApp } from "./firebase-config";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import Auth from "./Auth";
import Dashboard from "./Dashboard";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        console.log("Fetching Firestore data for UID:", currentUser.uid);
        const userRef = doc(db, "users", currentUser.uid);
        const userSnapshot = await getDoc(userRef);

        if (!userSnapshot.exists()) {
          console.log("No user document found. Creating new one...");
          await setDoc(userRef, {
            email: currentUser.email,
            createdAt: new Date(),
            quitDate: null,
            currentStep: "Month 1: Awareness & Small Habit Changes",
            streaks: 0,
            lastLoggedCigarette: null,
          });
        }
      }
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
      <Dashboard user={user} db={db} />
      <button className="logout-button" onClick={() => signOut(auth)}>
        Logout
      </button>
    </div>
  );
}

export default App;
