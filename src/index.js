import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import db from "./db";
import { addDoc, collection } from "firebase/firestore/lite";

function seedModels() {
  const modelsCollection = collection(db, "models");
  for (let i = 1; i < 1000; i++) {
    addDoc(modelsCollection, {
      codigo: `${i} sample codigo`,
      nit: `${i} sample nit`,
      nombre: `${i} sample nombre`,
      razonSocial: `${i} sample razon social`,
      telefono: `${i} sample telefono`,
    });
  }
}

// seedModels();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
