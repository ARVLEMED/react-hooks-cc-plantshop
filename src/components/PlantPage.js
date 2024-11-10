import React, { useState, useEffect } from "react";
import PlantCard from "./PlantCard";

function PlantPage() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data));
  }, []);

  const updatePlantPrice = (updatedPlant) => {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === updatedPlant.id ? updatedPlant : plant
      )
    );
  };

  const removePlant = (id) => {
    setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));
  };

  return (
    <div>
      <h1>Plant List</h1>
      <ul>
        {plants.map((plant) => (
          <PlantCard
            key={plant.id}
            plant={plant}
            updatePlantPrice={updatePlantPrice}
            removePlant={removePlant}
          />
        ))}
      </ul>
    </div>
  );
}

export default PlantPage;
