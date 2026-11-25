export default function PatientCard({ patient, onEdit, onDelete, onDischarge }) {
  const discharged = patient.status === "Discharged";

  return (
    <div className="card">
      <div className="card-top">
        <h3>{patient.name}</h3>
        <span className={discharged ? "badge discharged" : "badge"}>{patient.status}</span>
      </div>
      <p className="muted">{patient.age} yrs, {patient.gender}</p>

      <div className="line"><span>Ward</span><b>{patient.ward}</b></div>
      <div className="line"><span>Department</span><b>{patient.department}</b></div>
      <div className="line"><span>Doctor</span><b>{patient.doctor}</b></div>
      <div className="line"><span>Admitted</span><b>{patient.admissionDate}</b></div>

      <div className="actions">
        <button onClick={() => onEdit(patient)}>Edit</button>
        {!discharged && <button onClick={() => onDischarge(patient.id)}>Discharge</button>}
        <button className="danger" onClick={() => onDelete(patient)}>Delete</button>
      </div>
    </div>
  );
}