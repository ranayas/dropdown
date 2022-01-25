import { useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.css";
import Input from "../Input/Input";
import DropdownItem from "../DropdownItem/DropdownItem";
import AddNew from "../AddNew/AddNew";
import {
  addDoc,
  collection,
  endAt,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
} from "firebase/firestore/lite";
import Popup from "../Popup/Popup";
import db from "../../db";

const modelsCollection = collection(db, "models");

let lastFieldValue;

const Dropdown = ({ field = "nombre" }) => {
  const [showList, setShowList] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const listElement = useRef();

  function handleAddNewClick() {
    setShowPopup(true);
    setShowList(false);
  }

  function handleClick(value) {
    setInput(value);
    setShowList(false);
  }

  function handleFocus() {
    setShowList(true);
  }

  function handleInputChange(event) {
    setInput(event.target.value);
  }

  async function handleScroll() {
    if (!listElement.current) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = listElement.current;

    if (scrollTop + clientHeight === scrollHeight) {
      const modelsQuery = query(
        modelsCollection,
        orderBy(field),
        startAfter(lastFieldValue),
        endAt(`${input}\uf8ff`),
        limit(20)
      );

      const modelSnapshots = await getDocs(modelsQuery);

      if (modelSnapshots.empty) {
        return;
      }

      lastFieldValue =
        modelSnapshots.docs[modelSnapshots.docs.length - 1].data()[field];

      const models = [];

      modelSnapshots.forEach((model) => {
        models.push({ ...model.data(), id: model.id });
      });

      setList((previousList) => [...previousList, ...models]);
    }
  }

  useEffect(() => {
    async function getModels() {
      const modelsQuery = query(
        modelsCollection,
        orderBy(field),
        startAt(input),
        endAt(`${input}\uf8ff`),
        limit(20)
      );

      const modelSnapshots = await getDocs(modelsQuery);

      if (modelSnapshots.empty) {
        setList([]);
        return;
      }

      lastFieldValue =
        modelSnapshots.docs[modelSnapshots.docs.length - 1].data()[field];

      const models = [];

      modelSnapshots.docs.forEach((model) => {
        models.push({ ...model.data(), id: model.id });
      });

      setList(models);
    }

    getModels();
  }, [input, field]);

  function handleCancel() {
    setShowPopup(false);
  }

  async function handleSave(model) {
    await addDoc(modelsCollection, model);
    setShowPopup(false);
  }

  return (
    <div className={styles.dropdown}>
      <Input
        disabled={showPopup}
        onFocus={handleFocus}
        value={input}
        onChange={handleInputChange}
      />
      {showPopup && (
        <div className={styles["dropdown__popup-wrapper"]}>
          <Popup
            onSave={handleSave}
            field={field}
            value={input}
            onCancel={handleCancel}
          />
        </div>
      )}
      {showList && (
        <div
          ref={listElement}
          onScroll={handleScroll}
          className={styles.dropdown__list}
        >
          <AddNew onClick={handleAddNewClick}>Add new</AddNew>
          {list.map((item) => (
            <DropdownItem onClick={handleClick} key={item.id}>
              {item[field]}
            </DropdownItem>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
