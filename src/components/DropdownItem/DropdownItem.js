import styles from "./DropdownItem.module.css";

const DropdownItem = ({ children, onClick }) => {
  function handleClick() {
    onClick(children);
  }
  return (
    <div onClick={handleClick} className={styles["dropdown-item"]}>
      {children}
    </div>
  );
};

export default DropdownItem;
