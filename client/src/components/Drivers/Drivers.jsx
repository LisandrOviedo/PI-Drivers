import { useEffect } from "react";

import styles from "./Drivers.module.scss";

export default function Drivers() {
  useEffect(() => {
    document.title = "Drivers";

    return () => {
      document.title = "Drivers";
    };
  }, []);

  return <div className={styles.driversContainer}></div>;
}
