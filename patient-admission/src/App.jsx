import { useEffect, useState } from "react";
import "./App.css";
import {
  getPatients, createPatient, updatePatient,
  deletePatient, dischargePatient,
  
} from "./api";
import PatientCard from "./components/PatientCard";
import Filters from "./components/Filters";
import PatientForm from "./components/PatientForm";
import ConfirmDialog from "./components/ConfirmDialog";
const EMPTY_FILTERS = { search: "", ward: "", department: "", doctor: "" };

export default function App() {
  const [patients, setPatients] = useState([]);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null); // patient being edited, or null
  const [toDelete, setToDelete] = useState(null); // patient waiting for confirmation

  async function loadPatients() {
    const data = await getPatients(filters);
    setPatients(data);
  }

  useEffect(() => {
    loadPatients();
  }, [filters]);

  function openAdd() {
    setEditing(null);
    setShowForm(true);
  }

  function handleEdit(patient) {
    setEditing(patient);
    setShowForm(true);
  }

  async function handleSave(data) {
    if (editing) await updatePatient(editing.id, data);
    else await createPatient(data);
    setShowForm(false);
    loadPatients();
  }

  async function handleDischarge(id) {
    await dischargePatient(id);
    loadPatients();
  }

 function handleDelete(patient) {
  setToDelete(patient); // only opens the dialog, nothing is deleted yet
}

async function confirmDelete() {
  await deletePatient(toDelete.id);
  setToDelete(null);
  loadPatients();
}

  return (
    <div className="container">
      <div className="top">
        <h1>Patient Admission Management</h1>
        <button className="primary" onClick={openAdd}>+ Add patient</button>
      </div>

      <Filters
        filters={filters}
        onChange={setFilters}
        onClear={() => setFilters(EMPTY_FILTERS)}
      />

      <p className="muted">{patients.length} patients</p>

      <div className="list">
        {patients.map((p) => (
          <PatientCard
            key={p.id}
            patient={p}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDischarge={handleDischarge}
          />
        ))}
        {patients.length === 0 && <p className="empty">No patients found.</p>}
      </div>

      {showForm && (
        <PatientForm
          patient={editing}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}
            {toDelete && (
        <ConfirmDialog
          title="Delete patient?"
          message={`This will permanently remove ${toDelete.name}.`}
          onConfirm={confirmDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </div>
  );
}