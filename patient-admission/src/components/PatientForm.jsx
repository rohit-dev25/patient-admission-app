import { useState } from "react";
import { GENDERS, WARDS, DEPARTMENTS, DOCTORS } from "../constants";
import { validatePatient, todayString } from "../validation";

const EMPTY = {
  name: "", age: "", gender: "", ward: "",
  department: "", doctor: "", admissionDate: "",
};

export default function PatientForm({ patient, onSave, onCancel }) {
  // patient = null means Add, patient = object means Edit
  const [form, setForm] = useState(patient ? { ...patient } : EMPTY);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  function handle(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    const found = validatePatient(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return; // stop if any error

    try {
      await onSave({ ...form, name: form.name.trim() });
    } catch (err) {
      setServerError(err.message); // backend error, used later
    }
  }

  function select(name, label, options) {
    return (
      <label>
        {label}
        <select name={name} value={form[name]} onChange={handle}>
          <option value="">Select</option>
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
        <span className="err">{errors[name]}</span>
      </label>
    );
  }

  return (
    <div className="overlay">
      <form className="modal" onSubmit={submit} noValidate>
        <h2>{patient ? "Edit patient" : "Add patient"}</h2>

        <label>
          Name
          <input name="name" value={form.name} onChange={handle} />
          <span className="err">{errors.name}</span>
        </label>

        <div className="two">
          <label>
            Age
            <input name="age" type="number" value={form.age} onChange={handle} />
            <span className="err">{errors.age}</span>
          </label>
          {select("gender", "Gender", GENDERS)}
          {select("ward", "Ward", WARDS)}
          {select("department", "Department", DEPARTMENTS)}
          {select("doctor", "Doctor", DOCTORS)}
          <label>
            Admission date
            <input
              name="admissionDate"
              type="date"
              max={todayString()}
              value={form.admissionDate}
              onChange={handle}
            />
            <span className="err">{errors.admissionDate}</span>
          </label>
        </div>

        {serverError && <p className="err">{serverError}</p>}

        <div className="actions end">
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="submit" className="primary">Save</button>
        </div>
      </form>
    </div>
  );
}