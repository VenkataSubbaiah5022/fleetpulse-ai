# FleetPulse AI - Project Visualization

FleetPulse AI is a modern fleet management platform designed to provide real-time tracking, driver analytics, and automated alerting.

## 🏗️ System Architecture

The application follows a classic Client-Server architecture with a decoupled frontend and backend.

```mermaid
graph TD
    subgraph Frontend [Next.js Client]
        UI[Shadcn/UI Components]
        State[React State / Hooks]
        API_Lib[Lib/API Fetch]
    end

    subgraph Backend [Express API]
        Router[Express Router]
        Auth_MW[Auth Middleware - JWT]
        Controllers[Resource Controllers]
        Error_MW[Global Error Handler]
    end

    subgraph Database [MongoDB Atlas]
        Users[(Users)]
        Vehicles[(Vehicles)]
        Drivers[(Drivers)]
        Alerts[(Alerts)]
        Telemetry[(Telemetry)]
    end

    UI --> API_Lib
    API_Lib -- HTTP/JWT --> Router
    Router --> Auth_MW
    Auth_MW --> Controllers
    Controllers --> Database
    Error_MW -.-> UI
```

---

## 🔐 Authentication Flow

The system uses JSON Web Tokens (JWT) for secure communication and Role-Based Access Control (RBAC).

```mermaid
sequenceDiagram
    participant User as Client (Next.js)
    participant Auth as Auth Controller
    participant DB as MongoDB
    participant App as Protected Routes

    User->>Auth: POST /api/auth/login (email, password)
    Auth->>DB: findOne({email})
    DB-->>Auth: User Data (hashed password)
    Auth->>Auth: Verify Password
    Auth->>User: 200 OK (JWT Token)

    Note over User, App: Subsequent Requests
    User->>App: GET /api/vehicles (Header: Authorization: Bearer <token>)
    App->>App: Protect Middleware (jwt.verify)
    App->>User: 200 OK (Vehicle Data)
```

---

## 📊 Data Relationships

The data model is centered around Vehicles and their associated telemetry and oversight.

```mermaid
erDiagram
    USER ||--o{ VEHICLE : manages
    DRIVER ||--o{ VEHICLE : operates
    VEHICLE ||--o{ ALERT : triggers
    VEHICLE ||--o{ TELEMETRY : reports
    
    USER {
        string name
        string email
        string role "admin | dispatcher"
        string password
    }

    VEHICLE {
        string name
        string plateNumber
        string status "active | maintenance | inactive"
        string type
    }

    DRIVER {
        string name
        string licenseNumber
        string status "active | inactive"
    }

    ALERT {
        string severity "Critical | High | Medium"
        string message
        date timestamp
    }

    TELEMETRY {
        float fuelLevel
        float speed
        object location
    }
```

---

## 📂 Module Map

### Backend (`/backend/src`)
- **Controllers**: Logic for each resource (Auth, Vehicle, Driver, etc.).
- **Models**: Mongoose schemas for MongoDB.
- **Routes**: API endpoint definitions.
- **Middlewares**: Auth protection, Rate limiting, Security headers.
- **Utils**: Global error handling and shared utilities.

### Frontend (`/fleetpulse-frontend`)
- **app/**: Next.js App Router folders (Dashboard, Alerts, Fleet).
- **components/**: UI components (Shadcn/UI) and Dashboard-specific charts (Recharts).
- **lib/**: API service layer and utility functions.
- **public/**: Static assets.
