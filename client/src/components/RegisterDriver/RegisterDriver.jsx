import { useEffect } from "react";

import styles from "./RegisterDriver.module.scss";

export default function RegisterDriver() {
  useEffect(() => {
    document.title = "Driver Register - Drivers";

    return () => {
      document.title = "Drivers";
    };
  }, []);

  return <div></div>;
}
