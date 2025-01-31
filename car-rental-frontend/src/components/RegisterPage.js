import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './register.css';  


const RegisterPage = () => {
  const [email, setEmail] = useState(""); // Email state'i
  const [password, setPassword] = useState(""); // Şifre state'i
  const [name, setName] = useState(""); // İsim state'i
  const [city, setCity] = useState(""); // Şehir state'i
  const [country, setCountry] = useState(""); // Ülke state'i
  const [photo, setPhoto] = useState(null); // Fotoğraf state'i (opsiyonel)
  const [error, setError] = useState(""); // Hata mesajı
  const navigate = useNavigate(); // Yönlendirme işlevi

  const handleRegister = async (e) => {
    e.preventDefault();

    // Form verilerini hazırlıyoruz
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("city", city);
    formData.append("country", country);
    if (photo) formData.append("photo", photo);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Registration Response:", response);

      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed: " + (error.response?.data.message || "Unknown error"));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(file);
  };

  return (
    <div>
      <h1>Register Page</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            placeholder="Enter your country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>

        {/* Fotoğraf Yükleme */}
        <div>
          <label htmlFor="photo">Upload Photo (optional):</label>
          <input type="file" id="photo" onChange={handlePhotoChange} />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
