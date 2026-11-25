import { WARDS, DEPARTMENTS, DOCTORS } from "../constants";

export default function Filters({ filters, onChange, onClear }) {
  function handle(e) {
    onChange({ ...filters, [e.target.name]: e.target.value });
  }

  return (
    <div className="filters">
      <input
        name="search"
        placeholder="Search by name"
        value={filters.search}
        onChange={handle}
      />
      <select name="ward" value={filters.ward} onChange={handle}>
        <option value="">All wards</option>
        {WARDS.map((w) => <option key={w}>{w}</option>)}
      </select>
      <select name="department" value={filters.department} onChange={handle}>
        <option value="">All departments</option>
        {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
      </select>
      <select name="doctor" value={filters.doctor} onChange={handle}>
        <option value="">All doctors</option>
        {DOCTORS.map((d) => <option key={d}>{d}</option>)}
      </select>
      <button onClick={onClear}>Clear</button>
    </div>
  );
}