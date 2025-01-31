import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './home.css'; // CSS dosyasını dahil ediyoruz

const HomePage = () => {
  const [user, setUser] = useState(null); // Kullanıcı bilgileri
  const [city, setCity] = useState(""); // Kullanıcı şehri
  const [offices, setOffices] = useState([]); // Ofisler
  const [cars, setCars] = useState([]); // Araçlar
  const [loading, setLoading] = useState(false); // Yükleniyor durumu
  const [filters, setFilters] = useState({
    make: "",
    transmission: "",
    office: "",
    date: "",
    time: "",
  }); // Filtreler
  const [language, setLanguage] = useState("TR"); // Dil seçimi
  const navigate = useNavigate(); // Yönlendirme işlevi

  // Google Maps API'yi dinamik olarak yükleyelim
  useEffect(() => {
    if (!document.getElementById("google-maps-script")) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBTXgyNZPdnKGf9F-YfRL_w1ffu61CW8b4&libraries=places`; // API Key
      script.id = "google-maps-script";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log("Google Maps API başarıyla yüklendi.");
        renderMap();
      };
      script.onerror = () => {
        console.error("Google Maps API yüklenirken hata oluştu.");
      };
      document.head.appendChild(script);
    }

    return () => {
      const existingScript = document.getElementById("google-maps-script");
      if (existingScript) {
        existingScript.remove(); // Temizleme işlemi
      }
    };
  }, []);  // Yalnızca ilk render'da çalışması için

  // Kullanıcı bilgilerini alıyoruz
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUser(decodedToken);
      setCity(decodedToken.city); // Şehri kullanıcıdan al
    }
  }, [navigate]);

  // Google Maps API ile harita render etme
  const renderMap = () => {
    if (window.google && city && offices.length > 0) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.7128, lng: -74.0060 }, // Varsayılan olarak New York
        zoom: 10,
      });

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: city }, function (results, status) {
        if (status === "OK") {
          map.setCenter(results[0].geometry.location);  // Şehir merkezine git
        } else {
          console.error("Geocoding failed: " + status);
        }
      });

      // Ofisleri haritaya ekleme
      offices.forEach((office) => {
        new window.google.maps.Marker({
          position: {
            lat: office.location.coordinates[1],
            lng: office.location.coordinates[0],
          },
          map: map,
          title: office.name,
        });
      });

      // Araçlar için marker ekleme
      cars.forEach((car) => {
        new window.google.maps.Marker({
          position: {
            lat: car.location.coordinates[1],
            lng: car.location.coordinates[0],
          },
          map: map,
          title: car.model,
        });
      });
    } else {
      console.log("Google Maps API veya harita verisi henüz yüklenmedi.");
    }
  };

  // En yakın ofisleri al
  const getNearbyOffices = async () => {
    const location = user ? user.city : await getBrowserLocation();
    try {
      const response = await axios.get("http://localhost:5000/api/offices/nearby", {
        params: { city: location, radius: 30 },
      });
      setOffices(response.data);
    } catch (error) {
      console.error("Failed to get nearby offices:", error);
    }
  };

  // Araçları al (filtreleme ile)
  const getCars = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cars", {
        params: filters, // Burada filtreleme parametrelerini backend'e gönderiyoruz
      });
      setCars(response.data);
    } catch (error) {
      console.error("Failed to get cars:", error);
    }
  };

  // Tarayıcı konumu almak
  const getBrowserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(`${position.coords.latitude}, ${position.coords.longitude}`),
          (error) => reject("Konum alınamadı.")
        );
      } else {
        reject("Geolocation bu tarayıcıda desteklenmiyor.");
      }
    });
  };

  // Araçları filtrelemek
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Dil değiştirme fonksiyonu
  const handleLanguageSwitch = () => {
    setLanguage(language === "TR" ? "EN" : "TR");
  };

  // Çıkış yapma işlemi
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // "Ara" butonuna tıklanınca çalışacak fonksiyon
  const handleSearch = () => {
    getNearbyOffices(); // Ofisleri filtrele
    getCars(); // Araçları filtrele
  };

  return (
    <div className="homepage">
      <h1>{language === "TR" ? "Araç Kiralama" : "Car Rental"}</h1>

      {/* Dil değiştirme butonu */}
      <button className="language-switch" onClick={handleLanguageSwitch}>
        {language === "TR" ? "Switch to English" : "Türkçe'ye geç"}
      </button>

      {/* Kullanıcı giriş durumu */}
      {user ? (
        <div className="user-info">
          <p>{language === "TR" ? "Hoş geldiniz" : "Welcome"}, {user.name}!</p>
          <p>{language === "TR" ? "Email: " : "Email: "} {user.email}</p>
          <button className="logout" onClick={handleLogout}>
            {language === "TR" ? "Çıkış Yap" : "Logout"}
          </button>
        </div>
      ) : (
        <p>{language === "TR" ? "Yükleniyor..." : "Loading..."}</p>
      )}

      {/* Araç filtreleme */}
      <div className="filters">
        <input
          className="office-search"
          type="text"
          placeholder={language === "TR" ? "Ofis arayın..." : "Search for office..."}
          value={filters.office}
          name="office"
          onChange={handleFilterChange}
        />
        <select name="make" onChange={handleFilterChange}>
          <option value="">{language === "TR" ? "Marka Seçin" : "Select Make"}</option>
          <option value="Toyota">Toyota</option>
          <option value="BMW">BMW</option>
          <option value="Ford">Ford</option>
        </select>
        <select name="transmission" onChange={handleFilterChange}>
          <option value="">{language === "TR" ? "Vites Seçin" : "Select Transmission"}</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>
        <button className="search-button" onClick={handleSearch}>
          {language === "TR" ? "Ara" : "Search"}
        </button>
      </div>

      {/* Harita */}
      <div id="map" className="map"></div>

      {/* Yükleniyor durumu */}
      {loading ? (
        <p>{language === "TR" ? "Araçlar yükleniyor..." : "Cars are loading..."}</p>
      ) : (
        <div>
          <p>{language === "TR" ? "Bulunan Araçlar:" : "Found Cars:"}</p>
          <ul className="car-list">
            {cars.length > 0 ? (
              cars.map((car) => (
                <li key={car._id}>
                  <h3>{car.model}</h3>
                  <p>{language === "TR" ? "Vites Tipi: " : "Transmission: "} {car.transmission}</p>
                  <p>{language === "TR" ? "Depozito: " : "Deposit: "} {car.deposit} USD</p>
                  <p>{language === "TR" ? "Kilometre: " : "Mileage: "} {car.mileage} km</p>
                  <p>{language === "TR" ? "Yaş: " : "Age: "} {car.age} years</p>
                  <p>{language === "TR" ? "Günlük Ücret: " : "Cost: "} {car.cost} USD/day</p>
                </li>
              ))
            ) : (
              <p>{language === "TR" ? "Araç bulunamadı" : "No cars found"}</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomePage;
