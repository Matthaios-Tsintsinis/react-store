import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import styles from "../components/Register.module.css";

import Loading from "../components/Loading.js";

function Register({ authentication }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      if (authentication.authenticated) {
        window.location.href = "http://localhost:3001";
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  }, [authentication.authenticated]);

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.container}>
      <form
        action="https://localhost:3000/api/register"
        method="POST"
        className={styles.form}
      >
        <h2>Create account</h2>
        <div className={styles.section}>
          <label>Your name</label>
          <input
            type="text"
            name="username"
            placeholder="First and last name"
            required
          />
        </div>
        <div className={styles.section}>
          <label>Email</label>
          <input type="text" name="email" required />
        </div>
        <div className={styles.section}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="At least 6 characters"
            required
          />
        </div>
        <div className={styles.section}>
          <label>Re-enter password</label>
          <input type="password" name="passwordValidation" required />
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
