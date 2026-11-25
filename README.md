# Patient Admission Management App

A web app for hospital staff to manage admitted patients.

## Live Links

- **Live app:** https://patient-admission-app-alpha.vercel.app/
- **Backend API:** https://patient-admission-app-sikc.onrender.com/api/patients
- **GitHub:** https://github.com/rohit-dev25/patient-admission-app

> The backend is on Render's free tier, so the first load may take up to 60 seconds while the server wakes up.

## Tech Stack

| Part | Technology |
|---|---|
| Frontend | React (Vite), plain CSS |
| Backend | Java 17, Spring Boot (Spring Web, Spring Data MongoDB, Validation) |
| Database | MongoDB (Atlas in production), data persists after restarts |
| Hosting | Vercel (frontend), Render with Docker (backend), MongoDB Atlas (database) |

## Features

- Add, edit, delete (with confirmation) and view patients
- Mark a patient as Discharged
- Filter by Ward, Department and Doctor
- Search patients by name
- Responsive design for mobile, tablet and desktop
- Validation on both frontend and backend

## Validation Rules

- **Name:** required, letters and spaces only
- **Age:** required, whole number from 0 to 120
- **Gender, Ward, Department, Doctor:** required, must be from the list
- **Admission Date:** required, cannot be in the future
- The backend rejects invalid data with a 400 status and a clear JSON message, for example `{"message": "Name can have letters and spaces only"}`

## API Endpoints

| Method | URL | Description |
|---|---|---|
| GET | `/api/patients?search=&ward=&department=&doctor=` | List patients with optional filters |
| POST | `/api/patients` | Add a patient |
| PUT | `/api/patients/{id}` | Edit a patient |
| PATCH | `/api/patients/{id}/discharge` | Mark as Discharged |
| DELETE | `/api/patients/{id}` | Delete a patient |

## How to Run Locally

### Prerequisites
- Java 17 or newer
- Node.js 18 or newer (only for the React frontend tooling)
- MongoDB running locally on `mongodb://localhost:27017`

### Backend
```bash
cd patient-api
./mvnw spring-boot:run        # on Windows: .\mvnw.cmd spring-boot:run
```
The API runs at http://localhost:8080. To use another database, set the `MONGODB_URI` environment variable.

### Frontend
```bash
cd patient-admission
npm install
npm run dev
```
Create `patient-admission/.env` with:
```
VITE_API_URL=http://localhost:8080
```
Open http://localhost:5173.

## Screenshots

### Patient list
![Patient list](docs/screenshots/Screenshot%202026-11-25%20191307.png)

### Filters (Ward, Department, Doctor)
![Ward filter](docs/screenshots/Screenshot%202026-11-25%20191322.png)
![Ward and Department filter](docs/screenshots/Screenshot%202026-11-25%20191346.png)
![All three filters](docs/screenshots/Screenshot%202026-11-25%20191509.png)

### Add patient
![Add patient](docs/screenshots/Screenshot%202026-11-25%20191549.png)

### Search by name
![Search](docs/screenshots/Screenshot%202026-11-25%20191619.png)

### Edit patient
![Edit patient](docs/screenshots/Screenshot%202026-11-25%20191951.png)

### Delete confirmation
![Delete confirmation](docs/screenshots/Screenshot%202026-11-25%20192035.png)

## Project Structure

```
patient-admission/   React frontend
patient-api/         Spring Boot backend (Dockerfile included)
docs/screenshots/     screenshots
```

No passwords or secret keys are stored in this repository. The database connection string is provided through the `MONGODB_URI` environment variable.
