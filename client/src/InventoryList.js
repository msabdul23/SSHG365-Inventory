import React, { useEffect } from 'react';
import axios from 'axios';

function InventoryList({ items, setItems }) {
  useEffect(() => {
    axios.get('/inventory')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching inventory:', error));
  }, [setItems]);

  return (
    <div>
      <h2>Inventory Items</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - {item.quantity} {item.unit} (${item.costPerUnit} each)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InventoryList;