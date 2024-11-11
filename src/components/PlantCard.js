import React, { useState } from "react";

function PlantCard({ plant, setPlants }) {
  const [inStock, setInStock] = useState(true);
  const [price, setPrice] = useState(plant.price);
  const [successMessage, setSuccessMessage] = useState("");

  const handlePriceChange = (e) => {
    const updatedPrice = parseFloat(e.target.value);
    setPrice(updatedPrice);

    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({ price: updatedPrice }),
    })
      .then((response) => response.json())
      .then(() => {
        setSuccessMessage("Price updated successfully!");

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error updating price:", error);
      });
  };

  const toggleStockStatus = () => {
    setInStock((prevStatus) => !prevStatus);
  };

  const handleDelete = () => {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setPlants((prevPlants) =>
          prevPlants.filter((item) => item.id !== plant.id)
        );
        setSuccessMessage("Plant deleted successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      })
      .catch((error) => console.error("Error deleting plant:", error));
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} className="plant-image"/>
      <h4>{plant.name}</h4>
      <p>Price: {price}</p>
      <input
        type="number"
        value={price}
        onChange={handlePriceChange}
        step="0.01"
      />
      <button onClick={toggleStockStatus} className={inStock ? "toggle-butt" : "delete-button"}>
        {inStock ? "In Stock" : "Out of Stock"}
      </button>
      <button onClick={handleDelete} className="delete-button">
        Delete
      </button>

      {successMessage && <p>{successMessage}</p>}
    </li>
  );
}

export default PlantCard;
