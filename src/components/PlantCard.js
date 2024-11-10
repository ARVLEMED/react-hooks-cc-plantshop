import React, { useState } from "react";

function PlantCard({ plant, setPlants }) {
  const [inStock, setInStock] = useState(true);
  const [price, setPrice] = useState(plant.price);

  const handlePriceChange = (e) => {
    const updatedPrice = parseFloat(e.target.value);
    setPrice(updatedPrice);

    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: updatedPrice }),
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
      });
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {price}</p> {/* Removed $ sign to match expected format */}
      <input
        type="number"
        value={price}
        onChange={handlePriceChange}
        step="0.01"
        min="0"
      />
      <div className="buttons">
        <button
          onClick={toggleStockStatus}
          className={inStock ? "toggle-butt" : "out-of-stock-button"}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </button>
        <button onClick={handleDelete} className="delete-button">
          Delete
        </button>
      </div>
    </li>
  );
}

export default PlantCard;
