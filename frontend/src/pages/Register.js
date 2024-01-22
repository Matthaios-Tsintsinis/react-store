import { Link } from "react-router-dom";

import styles from "../components/Register.module.css";

function Register() {
  return (
    <div className={styles.container}>
      <form
        action="http://localhost:3000/api/register"
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
