import { useEffect } from "react";

import styles from "./PageNotFound.module.scss";

export default function PageNotFound() {
  useEffect(() => {
    document.title = "Error - Drivers";

    return () => {
      document.title = "Drivers";
    };
  }, []);

  return (
    <div className={styles.divContainer}>
      <h1>🤔 Error 404! 🤨</h1>
      <h2>Page not found! 😵</h2>
    </div>
  );
}
