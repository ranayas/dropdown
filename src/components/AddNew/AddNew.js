import styles from './AddNew.module.css'
const AddNew = ({ onClick, children }) => {
  return <div className={styles["add-new"]} onClick={onClick}>{children}</div>;
};

export default AddNew;
