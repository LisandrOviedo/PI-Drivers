import { useEffect } from "react";

import styles from "./Login.module.scss";

export default function Login() {
  useEffect(() => {
    document.title = "Login - Drivers";

    return () => {
      document.title = "Drivers";
    };
  }, []);

  return <div></div>;
}
