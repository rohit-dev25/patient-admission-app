const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
const API = `${BASE_URL}/api/patients`;

// sends the request and throws the backend's error message if it fails
async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    let message = "Something went wrong";
    try {
      const data = await res.json();
      message = data.message || message;
    } catch {
      // response had no JSON body
    }
    throw new Error(message);
  }

  if (res.status === 204) return null; // delete returns no body
  return res.json();
}

export function getPatients(filters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });
  return request(`${API}?${params.toString()}`);
}

export function createPatient(data) {
  return request(API, {
    method: "POST",
    body: JSON.stringify({ ...data, age: Number(data.age) }),
  });
}

export function updatePatient(id, data) {
  return request(`${API}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ ...data, age: Number(data.age) }),
  });
}

export function deletePatient(id) {
  return request(`${API}/${id}`, { method: "DELETE" });
}

export function dischargePatient(id) {
  return request(`${API}/${id}/discharge`, { method: "PATCH" });
}