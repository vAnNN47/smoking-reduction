// UserInfo.jsx
import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";

function UserInfo({ user, db }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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
    if (!isoString) return "Not logged yet";
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

  return (
    <div>
      <p>
        <strong>Current Step:</strong> {userData?.currentStep}
      </p>
      <p>
        <strong>Streaks:</strong> {userData?.streaks} days
      </p>
      <p>
        <strong>Last Logged Cigarette:</strong>{" "}
        {formatDateTime(userData?.lastLoggedCigarette)}
      </p>
    </div>
  );
}

export default UserInfo;
