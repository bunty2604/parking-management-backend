# Parking Management System — Backend

A REST API backend for managing a parking lot. It handles vehicle entry and exit, parking slot availability, parking history, dashboard statistics, and automatic parking fee calculation.

## Features

- **Vehicle Entry:** Register cars and bikes entering the parking lot.
- **Parking Slot Management:** Manage 10 parking slots and assign the first available slot.
- **Vehicle Exit:** Check out vehicles and calculate parking fees automatically.
- **Duplicate Entry Prevention:** Prevent a vehicle from being parked more than once at the same time.
- **Parking History:** Maintain records of completed parking sessions.
- **Dashboard Statistics:** Get total slots, available slots, occupied slots, completed sessions, and total earnings.
- **Input Validation:** Validate vehicle details and handle unavailable slots or invalid checkout requests.

## Tech Stack

- Node.js
- Express.js
- JavaScript


## Project Structure

```text
Billing-system-backend/
├── controllers/
│   └── parkingController.js
├── routes/
│   └── parkingRoutes.js
├── index.js
├── package.json
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_BACKEND_REPOSITORY_URL
```

### 2. Navigate to the project directory

```bash
cd Billing-system-backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the server

For development:

```bash
npm run dev
```

The backend runs at:

`http://localhost:5000`

## API Endpoints

Base URL: `http://localhost:5000/api/parking`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/status` | Get parking slot status |
| POST | `/entry` | Register vehicle entry |
| POST | `/exit` | Check out a vehicle |
| GET | `/history` | Get completed parking sessions |
| GET | `/dashboard` | Get dashboard statistics |

## Example API Requests

### Vehicle Entry

**POST** `/api/parking/entry`

Request body:

```json
{
  "vehicleNumber": "HR29AB1234",
  "vehicleType": "car"
}
```

Supported vehicle types: `car` and `bike`.

### Vehicle Exit

**POST** `/api/parking/exit`

Request body:

```json
{
  "vehicleNumber": "HR29AB1234"
}
```

The response includes the parking duration and calculated bill.

### Parking Status

**GET** `/api/parking/status`

Returns the total number of slots, available slots, occupied slots, and current parking details.

### Parking History

**GET** `/api/parking/history`

Returns records of completed parking sessions.

### Dashboard

**GET** `/api/parking/dashboard`

Returns parking availability, completed sessions, and total earnings.

## Parking Fee Calculation

- First hour or less: ₹30
- Every additional hour or part of an additional hour: ₹10

**Example:** If a vehicle stays for 80 minutes, the bill is ₹40.

## Data Storage

This project currently uses in-memory JavaScript data structures to store parking slots and parking history. No database is configured.

**Note:** All parking data is reset when the backend server restarts.

## Future Improvements

- Integrate a database for persistent storage.
- Add authentication and authorization.
- Add automated tests for API endpoints.
- Improve error handling and reporting.

## Author

Developed as a Parking Management System project.