import { useEffect, useState } from "react";
import axios from "axios";
import "../styles.scss"; // 📌 SCSS dosyasını içe aktardık

const Cars = () => {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [sortOption, setSortOption] = useState("lowestPrice");
    const [transmissionFilter, setTransmissionFilter] = useState("All");
    const [makeFilter, setMakeFilter] = useState("");
    const [loading, setLoading] = useState(true); // ⏳ Yükleme durumu

    useEffect(() => {
        axios.get("http://localhost:5000/api/cars")
            .then(response => {
                setCars(response.data);
                setFilteredCars(response.data);
            })
            .catch(error => console.error("❌ Araçlar yüklenirken hata oluştu:", error))
            .finally(() => setLoading(false)); // Yükleme tamamlandı
    }, []);

    useEffect(() => {
        let updatedCars = [...cars];

        // Şanzıman filtresi
        if (transmissionFilter !== "All") {
            updatedCars = updatedCars.filter(car => car.transmission === transmissionFilter);
        }

        // Marka filtresi
        if (makeFilter) {
            updatedCars = updatedCars.filter(car => car.brand.toLowerCase().includes(makeFilter.toLowerCase()));
        }

        // Fiyata göre sıralama
        if (sortOption === "lowestPrice") {
            updatedCars.sort((a, b) => a.dailyPrice - b.dailyPrice);
        } else if (sortOption === "highestPrice") {
            updatedCars.sort((a, b) => b.dailyPrice - a.dailyPrice);
        }

        setFilteredCars(updatedCars);
    }, [cars, transmissionFilter, makeFilter, sortOption]);

    return (
        <div className="container">
            <h1 className="title">🚗 Araç Listesi</h1>

            {/* 🛑 Hata veya Yükleme Durumu */}
            {loading ? (
                <p className="loading-text">⏳ Araçlar yükleniyor...</p>
            ) : filteredCars.length === 0 ? (
                <p className="no-results">⚠️ Uygun araç bulunamadı.</p>
            ) : (
                <>
                    {/* 🔍 Filtreleme ve Sıralama */}
                    <div className="filters">
                        <input
                            type="text"
                            placeholder="🔍 Marka Ara (Örn: Renault)"
                            className="input"
                            value={makeFilter}
                            onChange={(e) => setMakeFilter(e.target.value)}
                        />
                        <select className="select" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                            <option value="lowestPrice">💰 En Düşük Fiyat</option>
                            <option value="highestPrice">💰 En Yüksek Fiyat</option>
                        </select>
                        <select className="select" value={transmissionFilter} onChange={(e) => setTransmissionFilter(e.target.value)}>
                            <option value="All">🛠 Tüm Şanzıman Tipleri</option>
                            <option value="Manual">🔧 Manuel</option>
                            <option value="Automatic">⚙️ Otomatik</option>
                        </select>
                    </div>

                    {/* 🏎️ Araç Kartları */}
                    <div className="grid">
                        {filteredCars.map(car => (
                            <div key={car._id} className="car-card">
                                <img
                                    src={car.image ? `http://localhost:5000${car.image}` : `http://localhost:5000/images/placeholder.jpg`}
                                    alt={`${car.brand} ${car.model}`}
                                    className="car-image"
                                />
                                <div className="car-info">
                                    <h2>{car.brand} {car.model} ({car.year})</h2>
                                    <p><strong>🛠 Şanzıman:</strong> {car.transmission}</p>
                                    <p><strong>💵 Depozito:</strong> {car.deposit ? `${car.deposit.toLocaleString()} TL` : "Belirtilmemiş"}</p>
                                    <p><strong>🚗 Kilometre:</strong> {car.mileage ? `${car.mileage.toLocaleString()} km` : "Belirtilmemiş"}</p>
                                    <p><strong>🔞 Yaş Sınırı:</strong> {car.minAge}+</p>
                                    <p className="car-price">
                                        {car.dailyPrice ? `${car.dailyPrice.toFixed(2)} TL / Gün` : "⚠️ Fiyat Bilgisi Yok"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Cars;
