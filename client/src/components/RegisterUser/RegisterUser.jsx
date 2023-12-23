import { useEffect } from "react";

import styles from "./RegisterUser.module.scss";

export default function RegisterUser() {
  useEffect(() => {
    document.title = "Sign Up - Drivers";

    return () => {
      document.title = "Drivers";
    };
  }, []);

  return <div></div>;
}
