# Car Rental Web Application

## 📌 About the Project
This project is a web application where users can rent cars. Users can search for vehicles using different filters, list available cars, make reservations, and create user accounts to log in. Additionally, Google OAuth integration allows for quick sign-in.

The project is developed using **React (frontend)** and **Node.js (backend)**. **MongoDB** is used as the database, and **Multer** is utilized for file uploads related to car images.

[Demo Video](https://www.youtube.com/watch?v=JShFPJBYvBA)

---

## 🚀 Getting Started

### Requirements
To run this project, you need to have the following installed on your computer:
- **Node.js**: Download and install the latest LTS version from the [Node.js website](https://nodejs.org/).
- **MongoDB**: You can install MongoDB locally or use MongoDB Atlas.

---

## 🛠️ Technologies

### Frontend:
- React.js
- React Router
- Axios (for API requests)
- **SCSS** (for styling)

### Backend:
- Node.js
- Express.js (server framework)
- MongoDB (database)
- Mongoose (MongoDB interaction)
- bcryptjs (password encryption)
- Multer (file uploads)

### Other:
- Google OAuth (for Google login)

---

## 📥 Installation

### 1. Backend Setup
Follow these steps to set up the backend:

Clone the repository to your computer:

```bash
git clone https://github.com/your-username/car-rental-app.git
cd car-rental-app
```

Navigate to the backend directory:

```bash
cd backend
```

Install the required dependencies:

```bash
npm install
```

Create a **.env** file and configure the necessary settings, such as database connection:

```bash
DB_URI=mongodb://localhost:27017/car_rental
JWT_SECRET=your_jwt_secret_key
```

Start the server:

```bash
npm run start
```

The server will run at **http://localhost:5000**.

### 2. Frontend Setup
To set up the frontend:

Navigate to the frontend directory:

```bash
cd frontend
```

Install the required dependencies:

```bash
npm install
```

Start the application:

```bash
npm run dev
```

The frontend will run at **http://localhost:5173**.

---

## 🛠️ Usage

### 1. Home Page
- **Language Selection:** Users can switch between "EN" and "TR" languages.
- **Car Search:** Users can search for cars based on brand, model, price, etc.
- **Map and Office List:** The locations of available rental offices are displayed on a map.

### 2. Car Listing and Filtering
Users can search for cars using the following filters:
- **Brand:** Search for cars by brand.
- **Price:** Sort cars by daily rental price (ascending or descending).
- **Transmission Type:** Filter cars based on manual or automatic transmission.

### 3. User Registration and Login
- **Sign Up:** New users can register by providing an email, password, first name, last name, city, and country.
- **Google Login:** Users can quickly sign in using Google OAuth.
- **Password Login:** Users can log in with their email and password.

### 4. Car Rental
- Users can select a rental office and reserve cars for specific rental dates.

---

## 📄 API Usage

The backend provides the following API endpoints:

### **POST /api/users/register**
Registers a new user.

#### Request Body:
```json
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "johndoe@example.com",
    "password": "password123",
    "country": "Turkey",
    "city": "Izmir"
}
```

### **POST /api/users/login**
Logs in a user.

#### Request Body:
```json
{
    "email": "johndoe@example.com",
    "password": "password123"
}
```

### **POST /api/cars/add**
Adds a new car.

#### Request Body:
```json
{
    "brand": "BMW",
    "model": "320i",
    "year": 2022,
    "transmission": "Automatic",
    "deposit": 5000,
    "mileage": 30000,
    "minAge": 21,
    "dailyPrice": 1800,
    "location": "Istanbul",
    "image": "/images/bmw_320i.png"
}
```
