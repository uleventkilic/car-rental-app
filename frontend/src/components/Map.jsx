import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const Map = ({ offices }) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        const initMap = () => {
            if (!window.google || !window.google.maps) {
                console.error("🚨 Google Maps API yüklenemedi!");
                return;
            }

            console.log("✅ Google Maps API başarıyla yüklendi!");
            setMapLoaded(true);

            if (!mapRef.current) {
                console.error("🚨 Map konteyneri bulunamadı!");
                return;
            }

            // 📌 Google Maps oluştur
            const newMap = new window.google.maps.Map(mapRef.current, {
                center: { lat: 38.4192, lng: 27.1287 }, // 📌 İzmir merkezli
                zoom: 12,
            });

            setMap(newMap);
        };

        // 📌 Google Maps API'yi yükleme
        if (!window.google || !window.google.maps) {
            if (!document.querySelector("#google-maps-script")) {
                const script = document.createElement("script");
                script.id = "google-maps-script";
                script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC9Yaee1E-VgxvRs7PlRc-AFwopTAZDptg&libraries=marker`;
                script.async = true;
                script.defer = true;
                script.onload = () => {
                    console.log("✅ Google Maps API yüklendi!");
                    initMap();
                };
                document.head.appendChild(script);
            }
        } else {
            initMap();
        }
    }, []);

    // 📌 Ofisleri haritada gösterme
    useEffect(() => {
        if (map && offices.length) {
            offices.forEach((office) => {
                if (!office.location || !office.location.coordinates) {
                    console.warn(`🚨 Ofis ${office.name} için konum bilgisi eksik.`);
                    return;
                }

                const position = {
                    lat: office.location.coordinates[1], // Latitude
                    lng: office.location.coordinates[0], // Longitude
                };

                // 📌 Yeni Google Marker Kullanımı
                new window.google.maps.Marker({
                    position,
                    map,
                    title: office.name,
                });
            });
        }
    }, [map, offices]);

    return (
        <div className="map-container">
            {!mapLoaded && <p className="loading-text">⏳ Harita yükleniyor...</p>}
            <div ref={mapRef} className="map-view"></div>
        </div>
    );
};

// **PropTypes doğrulaması**
Map.propTypes = {
    offices: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            city: PropTypes.string.isRequired,
            location: PropTypes.shape({
                type: PropTypes.string.isRequired,
                coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
            }).isRequired,
        })
    ).isRequired,
};

export default Map;
