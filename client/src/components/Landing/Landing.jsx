import { useEffect } from "react";

import styles from "./Landing.module.scss";

export default function Landing() {
  useEffect(() => {
    document.title = "Drivers";

    return () => {
      document.title = "Drivers";
    };
  }, []);

  return <div></div>;
}
