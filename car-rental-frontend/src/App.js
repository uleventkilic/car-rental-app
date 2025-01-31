import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google'; // Google OAuth provider'ı ekliyoruz
import HomePage from "./components/HomePage"; 
import LoginPage from "./components/LoginPage"; 
import RegisterPage from "./components/RegisterPage"; 

const App = () => {
  return (
    <GoogleOAuthProvider clientId="568632332815-hgaj573q58c9159aspju75b9fgj9k5ut.apps.googleusercontent.com"> {/* Buraya Google OAuth Client ID'nizi ekleyin */}
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<LoginPage />} /> {/* Varsayılan olarak giriş sayfasına yönlendir */}
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
