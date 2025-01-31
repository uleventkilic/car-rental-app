import React, { useState } from "react";
import axios from "axios";

const ReservationForm = ({ officeId }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId"); // Kullanıcının ID'si
    if (!userId) {
      alert("Please log in to make a reservation");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/reservations", {
        userId,
        officeId,
        startDate,
        endDate,
      });
      console.log(response.data);
      alert("Reservation made successfully");
    } catch (error) {
      console.error("Error making reservation:", error);
    }
  };

  return (
    <div>
      <h2>Make a Reservation</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Reserve</button>
      </form>
    </div>
  );
};

export default ReservationForm;
