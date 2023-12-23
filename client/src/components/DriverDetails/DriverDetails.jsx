import { useEffect } from "react";

import styles from "./DriverDetails.module.scss";

export default function DriverDetails() {
  useEffect(() => {
    document.title = "Details ID - Drivers";

    return () => {
      document.title = "Drivers";
    };
  }, []);

  return <div></div>;
}
