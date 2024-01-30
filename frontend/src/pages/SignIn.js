// import { useEffect } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import styles from "./SignIn.module.css";

function SignIn({ authentication, onRefresh }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      if (authentication.authenticated) {
        window.history.back();
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
      .post("api/signIn", { username: username, password: password }, config)
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
        <h2>Sign In</h2>
        <div className={styles.section}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

        <button id="submit" type="submit" className={styles.submitButton}>
          Continue
        </button>
      </form>
      <div>
        <p>
          Don't have an account? <Link to="/register">Register ▶</Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
