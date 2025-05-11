import React, { useState } from 'react';
import InventoryList from './InventoryList';
import AddInventoryItem from './AddInventoryItem';

function App() {
  const [items, setItems] = useState([]);

  const handleAddItem = (newItem) => {
    setItems(prev => [...prev, newItem]);
  };

  return (
    <div className="App">
      <h1>SSHG365 Inventory</h1>
      <AddInventoryItem onAdd={handleAddItem} />
      <InventoryList items={items} setItems={setItems} />
    </div>
  );
}

export default App;