// Auth.jsx
import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseApp } from "./firebase-config";

const auth = getAuth(firebaseApp);

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    if (isLogin) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        setError(err.message);
      }
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleAuth}>
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
        <p className="toggle" onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
}

export default Auth;
