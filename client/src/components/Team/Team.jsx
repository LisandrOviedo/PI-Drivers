import styles from "./Team.module.scss";

export default function Team({ id, name }) {
  return <option value={name}>{name}</option>;
}
