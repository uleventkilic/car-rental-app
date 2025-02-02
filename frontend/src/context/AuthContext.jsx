import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get("http://localhost:5000/api/users/me", {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => setUser(response.data))
            .catch(() => localStorage.removeItem("token"));
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:5000/api/users/login", { email, password });
            localStorage.setItem("token", response.data.token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
            setUser(response.data.user);
            return true;
        } catch (error) {
            console.error("Giriş başarısız:", error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// ✅ PropTypes ile `children` doğrulaması eklendi
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;
