# Job Listing Application – Full Stack Submission

## 📁 Folder Structure

```
main/
├── frontend/ # Vite + React frontend
├── backend/  # Node.js + Express + MongoDB backend
└── README.md # You're here!
```

---

## 🚀 Deployed Links

- **Frontend (Live)**: [https://job-lisiting.vercel.app/](https://job-lisiting.vercel.app/)
- **Backend (Live API)**: [https://job-lisiting.onrender.com](https://job-lisiting.onrender.com)

---

## 🛠️ Steps to Run the Project Locally

### ✅ Prerequisites

- Node.js installed (v18+ recommended)
- MongoDB instance running locally or use MongoDB Atlas

---

### 🧩 Backend Setup

1. Go to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file inside the `backend/` directory:
   ```env
   NODE_DB_URl= add you db uri here
   PORT=5000
   ```
4. Run the backend server:
   ```bash
   npm run test
   ```
   The backend will start at [http://localhost:5000](http://localhost:5000).

   #### if you want to check the deployed backend , hit this api using postman or any other tool
   ```bash
     https://job-lisiting.onrender.com/api/jobs
   ```
   This will return a list of job listings.


### 🎨 Frontend Setup

1. Go to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file inside the `frontend/` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   This points to the backend API.
   If you are using a different port or URL, adjust accordingly.
   If you are using the live API, set it to:
   ```env
   VITE_API_URL=https://job-lisiting.onrender.com/api
   ```

4. Run the frontend app:
   ```bash
   npm run dev
   ```
   The frontend will run on [http://localhost:5173](http://localhost:5173) by default.

---

## 📄 API Features

### ✅ Available APIs

- **GET /api/jobs** – Fetch up to 100 job listings
- **GET /api/jobs/search?location=city** – Filter jobs by location

---

## 📌 Assumptions & Challenges

- Assumed that job data is already present in the database (no upload form in this version).
- Used MongoDB locally for ease, but compatible with MongoDB Atlas.
- Focused on clean API design and separation of frontend/backend codebases.

---

## 📜 License
This project is licensed under the MIT License. Feel free to use, modify, and distribute it as per the license terms.
- **License**: [MIT License](https://opensource.org/licenses/MIT)

## 👤 Author
- **Name**: Nitesh Saini