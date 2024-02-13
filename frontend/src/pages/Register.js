import axios from "axios";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import styles from "../components/Register.module.css";

import Loading from "../components/Loading.js";

function Register({ authentication, onRefresh }) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    try {
      setLoading(true);
      if (authentication.authenticated) {
        window.history.back(); //window.location.href = "http://localhost:3001";
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  }, [authentication.authenticated]);

  function handleSubmit(e) {
    e.preventDefault();

    const config = {
      withCredentials: true,
    };

    axios
      .post(
        "api/register",
        {
          username: username,
          email: email,
          password: password,
          passwordValidation: passwordValidation,
        },
        config
      )
      .then((response) => {
        onRefresh();
        window.history.back();
      })
      .catch((error) => {
        console.log("Error:", error.message);
        console.log("Response:", error.response); // Log the response for more details
      });
  }

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Create account</h2>
        <div className={styles.section}>
          <label>Your name</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="First and last name"
            required
          />
        </div>
        <div className={styles.section}>
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.section}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            required
          />
        </div>
        <div className={styles.section}>
          <label>Re-enter password</label>
          <input
            type="password"
            value={passwordValidation}
            onChange={(e) => setPasswordValidation(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Continue
        </button>
      </form>
      <div>
        <p>
          Already have an account? <Link to="/signin">Sign in ▶</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
