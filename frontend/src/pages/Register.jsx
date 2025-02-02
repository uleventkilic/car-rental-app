import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google"; // Google OAuth login
import "../styles.scss"; // SCSS dosyası

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [country, setCountry] = useState("Turkey");
    const [city, setCity] = useState("Izmir");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // 📌 Kullanıcı Kaydı
    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("⚠️ Şifreler uyuşmuyor!");
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/users/register", {
                firstName,
                lastName,
                email,
                password,
                country,
                city,
            });
            navigate("/login"); // Başarılı kayıt sonrası yönlendirme
        } catch (err) {
            setError(err.response?.data?.error || "❌ Kayıt sırasında bir hata oluştu.");
        }
    };

    // 📌 Google ile Kayıt
    const handleGoogleSuccess = async (response) => {
        try {
            const { credential } = response;
            await axios.post("http://localhost:5000/api/users/google", { token: credential });
            navigate("/login");
        } catch (err) {
            setError("❌ Google ile giriş sırasında bir hata oluştu.");
        }
    };

    const handleGoogleFailure = () => {
        setError("❌ Google ile giriş başarısız!");
    };

    return (
        <div className="register-container">
            <h1 className="register-title">Kayıt Ol</h1>
            {error && <p className="register-error">{error}</p>}

            <form onSubmit={handleRegister} className="register-form">
                <input
                    type="text"
                    placeholder="Ad"
                    className="register-input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Soyad"
                    className="register-input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="E-posta"
                    className="register-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Şifre"
                    className="register-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Şifre (Tekrar)"
                    className="register-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <select className="register-select" value={country} onChange={(e) => setCountry(e.target.value)}>
                    <option value="Turkey">Türkiye</option>
                    <option value="USA">USA</option>
                    <option value="Germany">Almanya</option>
                </select>
                <select className="register-select" value={city} onChange={(e) => setCity(e.target.value)}>
                    <option value="Izmir">İzmir</option>
                    <option value="Istanbul">İstanbul</option>
                    <option value="Ankara">Ankara</option>
                </select>

                <button type="submit" className="btn-primary">Kayıt Ol</button>
            </form>

            <hr className="register-divider" />

            {/* Google ile Giriş Butonu */}
            <div className="google-login">
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleFailure}
                    theme="filled_blue"
                    text="signup_with"
                    size="large"
                />
            </div>

            <p className="register-footer">
                Zaten bir hesabınız var mı? <a href="/login" className="text-link">Giriş Yap</a>
            </p>
        </div>
    );
};

export default Register;
