# 🏥 MediQueue Server

The official backend REST API for **MediQueue** — a tutor booking and session management platform. Built with Express.js v5 and MongoDB, it handles all business logic including tutor listings, session bookings, and JWT-authenticated user operations.

🔗 **Frontend Live Site:** [https://mediqueue-indol.vercel.app](https://mediqueue-indol.vercel.app)  
📦 **Frontend Repository:** [mediqueue](https://github.com/Morshedul-developer/mediqueue)

---

## ✨ Key Features

- 🔐 **JWT Authentication** — All sensitive routes are protected using `jose-cjs` for token verification, ensuring only authorized users can access or modify their data.
- 📋 **Tutor Listing API** — Provides a clean endpoint to fetch available tutors, consumed by the frontend home page and tutors listing page.
- 📅 **Session Booking Management** — Handles creation and retrieval of tutoring session bookings, scoped per user via email-based queries.
- ❌ **Booking Cancellation** — Supports PATCH requests to cancel active bookings, with proper status updates persisted in MongoDB.
- 🌐 **CORS Configured** — Fully configured cross-origin resource sharing to allow secure communication with the deployed frontend.
- 🚀 **Vercel Ready** — Includes `vercel.json` configuration for zero-friction serverless deployment on Vercel.

---

## 🛠️ Tech Stack

| Category       | Technology          |
|----------------|----------------------|
| Runtime        | Node.js             |
| Framework      | Express.js v5       |
| Database       | MongoDB v7          |
| Authentication | jose-cjs (JWT)      |
| Environment    | dotenv              |
| CORS           | cors                |
| Deployment     | Vercel              |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas URI

### Installation

```bash
# Clone the repository
git clone https://github.com/Morshedul-developer/mediqueue-server.git
cd mediqueue-server

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
```

### Run the Server

```bash
node index.js
```

Server will start at [http://localhost:5000](http://localhost:5000).

---

## 📡 API Endpoints

| Method | Endpoint                          | Description                        | Auth Required |
|--------|-----------------------------------|------------------------------------|---------------|
| GET    | `/available-tutors`               | Get all available tutors           | ❌            |
| GET    | `/myBookedSessions?email={email}` | Get bookings for a specific user   | ✅            |
| PATCH  | `/myBookedSessions/:id`           | Cancel a specific booking          | ✅            |

---

## 📁 Project Structure

```
mediqueue-server/
├── index.js          # Entry point — Express app, routes, DB connection
├── vercel.json       # Vercel serverless deployment config
├── package.json
└── .env              # Environment variables (not committed)
```

---

## 🔗 Related

- **Frontend Repository:** [mediqueue](https://github.com/Morshedul-developer/mediqueue)
- **Live Site:** [https://mediqueue-indol.vercel.app](https://mediqueue-indol.vercel.app)