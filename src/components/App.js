import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";

function App() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data));
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="app">
      <header>
        <h1>Plantsy 🌱</h1>
      </header>
      <main>
        <div className="searchbar">
          <label htmlFor="search">Search Plants:</label>
          <input
            id="search"
            type="text"
            placeholder="Type a name to search..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        <NewPlantForm setPlants={setPlants} />

        <PlantList plants={plants} search={search} setPlants={setPlants} />
      </main>
    </div>
  );
}

export default App;
