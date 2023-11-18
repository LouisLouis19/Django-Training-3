import React, { useState, useEffect } from "react";
import axios from "axios";

import "../styles.css";

const ItemComponent = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  useEffect(() => {
    // Fetch items from Django API
    axios
      .get("http://127.0.0.1:8000/api/items/")
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "itemName") {
      setItemName(value);
    } else if (name === "itemDescription") {
      setItemDescription(value);
    }
  };

  const handleCreateItem = () => {
    // Post request to create a new item
    axios
      .post("http://127.0.0.1:8000/api/items/", {
        name: itemName,
        description: itemDescription,
      })
      .then((response) => {
        setItems([...items, response.data]);
        setItemName("");
        setItemDescription("");
      })
      .catch((error) => console.error("Error creating item:", error));
  };

  const handleDeleteItem = (itemId) => {
    // Delete request to delete an item
    axios
      .delete(`http://127.0.0.1:8000/api/items/${itemId}/`)
      .then((response) => {
        setItems(items.filter((item) => item.id !== itemId));
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  return (
    <div className="container">
      <h1 className="heading">Items</h1>

      <div className="form-container">
        <h2>Create Item</h2>
        <form>
          <label htmlFor="itemName">Name:</label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            value={itemName}
            onChange={handleInputChange}
          />

          <label htmlFor="itemDescription">Description:</label>
          <input
            type="text"
            id="itemDescription"
            name="itemDescription"
            value={itemDescription}
            onChange={handleInputChange}
          />

          <div className="button-container">
            <button type="button" onClick={handleCreateItem}>
              Create Item
            </button>
          </div>
        </form>
      </div>

      <ul className="list">
        {items.map((item) => (
          <li key={item.id} className="list-item">
            <div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
            <div className="button-container">
              <button type="button" onClick={() => handleDeleteItem(item.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemComponent;
