import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, search, setPlants }) {
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ul className="cards">
      {filteredPlants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} setPlants={setPlants} />
      ))}
    </ul>
  );
}

export default PlantList;
