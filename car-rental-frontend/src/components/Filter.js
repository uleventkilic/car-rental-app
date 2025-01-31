import React, { useState } from "react";

const Filter = ({ offices, setFilteredOffices }) => {
  const [city, setCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilter = () => {
    let filtered = offices;

    if (city) {
      filtered = filtered.filter((office) => office.city.toLowerCase().includes(city.toLowerCase()));
    }

    if (minPrice) {
      filtered = filtered.filter((office) => office.price >= minPrice);
    }

    if (maxPrice) {
      filtered = filtered.filter((office) => office.price <= maxPrice);
    }

    setFilteredOffices(filtered);
  };

  return (
    <div>
      <h3>Filter Offices</h3>
      <label>
        City:
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      </label>
      <br />
      <label>
        Min Price:
        <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
      </label>
      <br />
      <label>
        Max Price:
        <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
      </label>
      <br />
      <button onClick={handleFilter}>Apply Filters</button>
    </div>
  );
};

export default Filter;
