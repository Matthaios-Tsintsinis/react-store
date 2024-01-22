// import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./SignIn.module.css";

function SignIn() {
  return (
    <div className={styles.container}>
      <form
        action="http://localhost:3000/api/signIn"
        method="POST"
        className={styles.form}
      >
        <h2>Sign In</h2>
        <div className={styles.section}>
          <label>Username</label>
          <input type="text" name="username" required />
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
