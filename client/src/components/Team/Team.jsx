import styles from "./Team.module.scss";

export default function Team({ name }) {
  return <option value={name}>{name}</option>;
}
