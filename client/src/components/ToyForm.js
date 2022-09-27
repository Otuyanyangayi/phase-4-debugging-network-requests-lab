import React, { useState } from "react";

function ToyForm({ onAddToy }) {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newToy = {
      ...formData,
      likes: 0,
    };

    fetch("/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
    .then((response) => {
      if (response.ok) {
        response.json().then((newToy) => console.log(newToy));
      } else {
        response.json().then((errorData) => setErrors(errorData.errors));
      }
    })
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="add-toy-form">
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
          placeholder="Enter a toy's name..."
          className="input-text"
        />
        <br />
        <input
          type="text"
          name="image"
          onChange={handleChange}
          value={formData.image}
          placeholder="Enter a toy's image URL..."
          className="input-text"
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
        {errors.length > 0 && (
       <ul style={{ color: "red" }}>
      {errors.map((error) => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  )}

      </form>
    </div>
  );
}

export default ToyForm;
