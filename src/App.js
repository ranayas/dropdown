import styles from "./App.module.css";
import Dropdown from "./components/Dropdown/Dropdown";

function App() {
  return (
    <div className="App">
      <div className={styles.app__dropdown}>Dropdown</div>
      <Dropdown field="nombre" />
      <div className={styles["app__test-text"]}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
        quisquam, veritatis modi harum dicta maxime in non quae dolor reiciendis
        numquam saepe eaque dolorem minus repudiandae blanditiis sapiente
        delectus cumque.
      </div>
    </div>
  );
}

export default App;
