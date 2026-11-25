import { GENDERS, WARDS, DEPARTMENTS, DOCTORS } from "./constants";

export function todayString() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function validatePatient(form) {
  const errors = {};
  const name = (form.name || "").trim();
  const age = form.age;

  // Name: required, letters (and spaces) only
  if (!name) errors.name = "Name is required";
  else if (!/^[A-Za-z ]+$/.test(name)) errors.name = "Name can have letters and spaces only";

  // Age: required, whole number 0 to 120
  if (age === "" || age === null || age === undefined) errors.age = "Age is required";
  else if (!Number.isInteger(Number(age)) || Number(age) < 0 || Number(age) > 120)
    errors.age = "Age must be a whole number from 0 to 120";

  // Selects: required and must be in the list
  if (!GENDERS.includes(form.gender)) errors.gender = "Please select a gender";
  if (!WARDS.includes(form.ward)) errors.ward = "Please select a ward";
  if (!DEPARTMENTS.includes(form.department)) errors.department = "Please select a department";
  if (!DOCTORS.includes(form.doctor)) errors.doctor = "Please select a doctor";

  // Admission date: required, not in the future
  if (!form.admissionDate) errors.admissionDate = "Admission date is required";
  else if (form.admissionDate > todayString())
    errors.admissionDate = "Admission date cannot be in the future";

  return errors;
}