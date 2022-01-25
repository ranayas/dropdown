import styles from "./Input.module.css";

const Input = ({ disabled, onFocus, value, onChange }) => {
  return (
    <input
      disabled={disabled}
      onFocus={onFocus}
      className={styles.input}
      type="text"
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
