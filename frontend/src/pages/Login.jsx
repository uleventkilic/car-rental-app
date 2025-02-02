import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "axios";
import AuthContext from "../context/AuthContext"; // AuthContext importu
import "../styles.scss"; // SCSS dosyasını dahil et

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext); // AuthContext içindeki login fonksiyonunu al
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        if (!email || !password) {
            setError("E-posta ve şifreyi girmeniz gerekiyor.");
            return;
        }

        try {
            const success = await login(email, password); // AuthContext içindeki login fonksiyonunu kullan
            if (success) {
                navigate("/"); // Başarılı girişten sonra ana sayfaya yönlendir
            } else {
                setError("Giriş başarısız! Lütfen bilgilerinizi kontrol edin.");
            }
        } catch (err) {
            setError(err.response?.data?.error || "Giriş sırasında hata oluştu.");
            console.error("Giriş hatası:", err); // Hata detaylarını logla
        }
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Giriş Yap</h1>
            {error && <p className="login-error">{error}</p>}

            <form onSubmit={handleLogin} className="login-form">
                <input
                    type="email"
                    placeholder="E-posta"
                    className="login-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Şifre"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="btn-primary">
                    Giriş Yap
                </button>
            </form>

            <hr className="login-divider" />

            {/* Google ile Giriş Butonu */}
            <a href="http://localhost:5000/api/users/auth/google" className="btn-google">
                Google ile Giriş Yap
            </a>
        </div>
    );
};

export default Login;
