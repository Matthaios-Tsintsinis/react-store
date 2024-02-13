import { useEffect } from "react";
import styles from "./Loading.module.css";

function Loading() {
  useEffect(() => console.log("doing it.."));

  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
}

export default Loading;
