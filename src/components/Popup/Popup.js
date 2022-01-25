import { useState } from "react";
import styles from "./Popup.module.css";
import FormInput from "../FormInput/FormInput";

const Popup = ({ children, field, value, onCancel, onSave }) => {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    nombre: field === "nombre" ? value : "",
    razonSocial: field === "razonSocial" ? value : "",
    nit: field === "nit" ? value : "",
    telefono: field === "telefono" ? value : "",
    codigo: field === "codigo" ? value : "",
  });

  function handleOnChange(event) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  async function handleSave() {
    setSaving(true);
    await onSave(form);
    setSaving(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.popup}
      onChange={handleOnChange}
    >
      <FormInput name={"nombre"} value={form.nombre} label={"Nombre"} />
      <FormInput
        name={"razonSocial"}
        value={form.razonSocial}
        label={"Razon Social"}
      />
      <FormInput name={"nit"} value={form.nit} label={"NIT"} />
      <FormInput name={"telefono"} value={form.telefono} label={"Telefono"} />
      <FormInput name={"codigo"} value={form.codigo} label={"Codigo"} />
      {children}
      <button
        className={styles.popup__button}
        disabled={saving}
        onClick={handleSave}
      >
        Save
      </button>
      <button className={styles.popup__button} onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default Popup;
