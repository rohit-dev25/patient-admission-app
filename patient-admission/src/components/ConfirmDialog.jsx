export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="overlay">
      <div className="modal">
        <h2>{title}</h2>
        <p className="muted">{message}</p>
        <div className="actions end">
          <button onClick={onCancel}>Cancel</button>
          <button className="danger-fill" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}