import styles from "./FormInput.module.css";

const FormInput = ({ label, value, name }) => {
  return (
    <div className={styles["form-input"]}>
      <label htmlFor={name}>{label}</label>
      <input
        className={styles["form-input__input"]}
        type="text"
        defaultValue={value}
        name={name}
      />
    </div>
  );
};

export default FormInput;
