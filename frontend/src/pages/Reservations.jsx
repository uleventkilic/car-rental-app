import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const Reservations = () => {
    const { user } = useContext(AuthContext);
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:5000/api/reservations/user/${user._id}`)
                .then(response => {
                    setReservations(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Rezervasyonlar yüklenirken hata oluştu:", error);
                    setError("Rezervasyonları yüklerken bir hata oluştu.");
                    setLoading(false);
                });
        }
    }, [user]);

    const handleCancel = (reservationId) => {
        axios.delete(`http://localhost:5000/api/reservations/${reservationId}`)
            .then(() => {
                setReservations(reservations.filter(res => res._id !== reservationId));
            })
            .catch(error => console.error("Rezervasyon iptal edilemedi:", error));
    };

    if (!user) {
        return <p className="text-center text-red-500">Rezervasyonları görmek için giriş yapmalısınız.</p>;
    }

    if (loading) {
        return <p className="text-center">Yükleniyor...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Rezervasyonlarım</h1>
            {reservations.length === 0 ? (
                <p className="text-gray-600">Henüz bir rezervasyonunuz bulunmamaktadır.</p>
            ) : (
                <ul className="space-y-4">
                    {reservations.map(res => (
                        <li key={res._id} className="border p-4 rounded shadow">
                            <p><strong>Araç:</strong> {res.car.brand} {res.car.model}</p>
                            <p><strong>Kiralama Tarihi:</strong> {new Date(res.startDate).toLocaleDateString()} - {new Date(res.endDate).toLocaleDateString()}</p>
                            <button onClick={() => handleCancel(res._id)} className="bg-red-500 text-white px-4 py-2 mt-2 rounded">
                                Rezervasyonu İptal Et
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Reservations;
