import React, { useEffect, useState } from 'react';
import axios from 'axios';

function InventoryList({ items, setItems }) {
  const [editItemId, setEditItemId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    category: '',
    unit: '',
    quantity: '',
    costPerUnit: ''
  });

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

  const startEdit = (item) => {
    setEditItemId(item.id);
    setEditForm({ ...item });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    try {
      const updated = await axios.put(`https://sshg365-api.onrender.com/inventory/${editItemId}`, {
        ...editForm,
        quantity: parseFloat(editForm.quantity),
        costPerUnit: parseFloat(editForm.costPerUnit)
      });

      setItems(items.map(item => item.id === editItemId ? updated.data : item));
      setEditItemId(null);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <div>
      <h2>Inventory Items</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {editItemId === item.id ? (
              <span>
                <input name="name" value={editForm.name} onChange={handleEditChange} />
                <input name="category" value={editForm.category} onChange={handleEditChange} />
                <input name="unit" value={editForm.unit} onChange={handleEditChange} />
                <input name="quantity" type="number" value={editForm.quantity} onChange={handleEditChange} />
                <input name="costPerUnit" type="number" step="0.01" value={editForm.costPerUnit} onChange={handleEditChange} />
                <button onClick={saveEdit}>Save</button>
              </span>
            ) : (
              <span>
                {item.name} - {item.quantity} {item.unit} (${item.costPerUnit} each)
                <button onClick={() => startEdit(item)} style={{ marginLeft: '10px' }}>Edit</button>
                <button onClick={() => handleDelete(item.id)} style={{ marginLeft: '5px', color: 'red' }}>Delete</button>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InventoryList;