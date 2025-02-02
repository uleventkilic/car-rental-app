import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Google OAuth provider'ı import ettik
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reservations from "./pages/Reservations";

function App() {
    return (
        // GoogleOAuthProvider ile sarmalıyoruz
        <GoogleOAuthProvider clientId="1063222330173-fos7lsi8dl21iq8eqor5cer7le8taf16.apps.googleusercontent.com"> {/* Buraya kendi clientId'nizi ekleyin */}
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cars" element={<Cars />} />
                    <Route path="/reservations" element={<Reservations />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Router>
        </GoogleOAuthProvider>
    );
}

export default App;
