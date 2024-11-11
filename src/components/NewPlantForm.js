import React, { useState } from "react";

function NewPlantForm({ setPlants }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); 

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newPlant = { 
      name, 
      image, 
      price: price.toString() 
    };

    setLoading(true);

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((addedPlant) => {
        setLoading(false); 
        setPlants((prevPlants) => [...prevPlants, addedPlant]);

        setSuccessMessage("Plant added successfully!"); 

        setTimeout(() => {
          setSuccessMessage(""); 
        }, 3000); 

        setName("");
        setImage("");
        setPrice("");
      })
      .catch((error) => {
        setLoading(false); 
        console.error("Error adding plant:", error);
      });
  };

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add Plant</button>
      </form>

      {loading && <p>Loading...</p>}

      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default NewPlantForm;
