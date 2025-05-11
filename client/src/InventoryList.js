import React, { useEffect } from 'react';
import axios from 'axios';

function InventoryList({ items, setItems }) {
  useEffect(() => {
    axios.get('https://sshg365-api.onrender.com/inventory')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching inventory:', error));
  }, [setItems]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://sshg365-api.onrender.com/inventory/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div>
      <h2>Inventory Items</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - {item.quantity} {item.unit} (${item.costPerUnit} each)
            <button onClick={() => handleDelete(item.id)} style={{ marginLeft: '10px', color: 'red' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InventoryList;