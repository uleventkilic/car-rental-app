# 🚗 Car Rental App 

This project is a web application where users can rent vehicles, list available cars, and compare offices.

---

## 🎥 Video Demo

[Car Rental App Demo](https://youtu.be/JIPjPz7okjQ)

---

## 📌 Project Features

- ✅ User registration and login system (JWT Authentication)
- ✅ Vehicle rental and listing
- ✅ Office-based vehicle comparisons
- ✅ Responsive frontend design (React.js)
- ✅ Powerful backend with Node.js + Express.js
- ✅ Data storage with MongoDB

---

## 📂 Project Structure

```plaintext
car-rental-app/
│-- car-rental-frontend/  # React.js Frontend
│-- car-rental-backend/   # Node.js & Express.js Backend
│-- models/               # MongoDB Schema Models
│-- routes/               # API Routes
│-- server.js             # Backend Main File
│-- .env                  # Environment Variables
```

---

## 🛠 Installation Instructions

### 1️⃣ Install Dependencies

After cloning the project, install the backend and frontend dependencies:

```bash
git clone https://github.com/username/car-rental-app.git
cd car-rental-app
npm install
```

To install frontend dependencies:

```bash
cd car-rental-frontend
npm install
```

---

### 2️⃣ Setting Up the .env File

Your `.env` file should contain the following:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/car-rental
JWT_SECRET=your_secret_key_here
PORT=5000
```

Replace the MongoDB URI and JWT_SECRET values with your actual credentials.

---

### 3️⃣ Running the Backend

```bash
cd car-rental-app
npm start
```

---

### 4️⃣ Running the Frontend

```bash
cd car-rental-frontend
npm start
```

The application will run at:

- **Frontend:** http://localhost:3000  
- **Backend:** http://localhost:5000  

---

## 📌 API Usage

### 🔐 Authentication Routes

- `POST /api/auth/register` → User registration
- `POST /api/auth/login` → User login

### 🚗 Vehicle Routes

- `GET /api/cars` → List all vehicles
- `POST /api/cars` → Add a new vehicle
- `GET /api/cars/:id` → Retrieve a specific vehicle
- `DELETE /api/cars/:id` → Delete a vehicle

### 🏢 Office Routes

- `GET /api/offices` → List all offices
- `POST /api/offices` → Add a new office
- `GET /api/offices/:id` → Retrieve a specific office

---


## 🔥 Development Process

This project was developed using the following technologies:

- **Frontend:** React.js, Axios, React Router
- **Backend:** Express.js, JWT, Mongoose, Bcrypt
- **Database:** MongoDB

---
