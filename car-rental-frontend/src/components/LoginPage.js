import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google"; // Google Login bileşeni
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './login.css';

const LoginPage = () => {
  const [email, setEmail] = useState(""); // Email state'i
  const [password, setPassword] = useState(""); // Şifre state'i
  const [error, setError] = useState(""); // Hata mesajı
  const navigate = useNavigate(); // Yönlendirme işlevi

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Login başarılıysa token'ı localStorage'a kaydediyoruz
      localStorage.setItem("token", response.data.token);
      navigate("/home"); // Ana sayfaya yönlendiriyoruz
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password");
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      const googleData = response.credential; // Google'dan gelen credential
      const userData = await axios.post("http://localhost:5000/api/auth/google", {
        token: googleData,
      });

      localStorage.setItem("token", userData.data.token);
      navigate("/home"); // Google girişinden sonra HomePage'e yönlendir
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  // Register butonuna tıklandığında yapılacak işlem
  const handleRegisterRedirect = () => {
    navigate("/register"); // Kullanıcıyı kayıt sayfasına yönlendirme
  };

  return (
    <div>
      <h1>Login Page</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
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

        <button type="submit">Login</button>
      </form>

      {/* Google Login Button */}
      <GoogleLogin 
        onSuccess={handleGoogleLogin} 
        onError={() => setError("Google login failed")} 
      />

      {/* Register Butonu */}
      <div>
        <button onClick={handleRegisterRedirect}>Register</button>
      </div>
    </div>
  );
};

export default LoginPage;
