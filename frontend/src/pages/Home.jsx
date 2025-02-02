import { useState, useEffect } from "react";
import axios from "axios";
import Map from "../components/Map"; // 📌 Harita bileşeni
import { useNavigate } from "react-router-dom";
import "../styles.scss"; // 📌 SCSS dosyasını içe aktardık

const Home = () => {
    const [offices, setOffices] = useState([]);
    const [selectedOffice, setSelectedOffice] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [language, setLanguage] = useState("EN");
    const navigate = useNavigate();

    // 📌 Ofisleri yükleme
    useEffect(() => {
        axios.get("http://localhost:5000/api/offices")
            .then((response) => setOffices(response.data))
            .catch((error) => console.error("Ofisler yüklenirken hata:", error));
    }, []);

    // 📌 Arama işlemi
    const handleSearch = () => {
        if (!selectedOffice || !startDate || !endDate) {
            alert(language === "EN" ? "Please fill all fields!" : "Lütfen tüm alanları doldurun!");
            return;
        }
        navigate("/cars", { state: { office: selectedOffice, startDate, endDate } });
    };

    return (
        <div className="home-container">
            {/* 🌍 Dil Seçimi */}
            <div className="language-selector">
                <button onClick={() => setLanguage("EN")} className={language === "EN" ? "active" : ""}>EN</button>
                <button onClick={() => setLanguage("TR")} className={language === "TR" ? "active" : ""}>TR</button>
            </div>

            {/* 🚗 Araç Kiralama Formu */}
            <div className="search-container">
                <h2>{language === "EN" ? "Search Cars" : "Araç Ara"}</h2>
                <div className="search-fields">
                    <div>
                        <label>{language === "EN" ? "Pick-Up Office" : "Teslim Alma Ofisi"}</label>
                        <select value={selectedOffice} onChange={(e) => setSelectedOffice(e.target.value)}>
                            <option value="">{language === "EN" ? "Select Office" : "Ofis Seçin"}</option>
                            {offices.map((office) => (
                                <option key={office._id} value={office._id}>
                                    {office.name} - {office.city}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>{language === "EN" ? "Drop-Off Office" : "İade Ofisi"}</label>
                        <select>
                            <option value="">{language === "EN" ? "Select Office" : "Ofis Seçin"}</option>
                            {offices.map((office) => (
                                <option key={office._id} value={office._id}>
                                    {office.name} - {office.city}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>{language === "EN" ? "Pick-Up Date" : "Teslim Alma Tarihi"}</label>
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div>
                        <label>{language === "EN" ? "Drop-Off Date" : "İade Tarihi"}</label>
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                </div>
                <button onClick={handleSearch}>{language === "EN" ? "Search" : "Ara"}</button>
            </div>

            {/* 📍 Harita ve Ofis Listesi */}
            <div className="office-map-container">
                <div className="office-list">
                    <h3>{language === "EN" ? "Available Offices" : "Mevcut Ofisler"}</h3>
                    <ul>
                        {offices.map((office) => (
                            <li key={office._id}>{office.name} - {office.city}</li>
                        ))}
                    </ul>
                </div>
                <div className="map-container">
                    <Map offices={offices} />
                </div>
            </div>
        </div>
    );
};

export default Home;
