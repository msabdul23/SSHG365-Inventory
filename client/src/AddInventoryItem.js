import React, { useState } from 'react';
import axios from 'axios';

function AddInventoryItem({ onAdd }) {
  const [form, setForm] = useState({
    name: '',
    category: '',
    unit: '',
    quantity: '',
    costPerUnit: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://sshg365-api.onrender.com/inventory', {
        ...form,
        quantity: parseFloat(form.quantity),
        costPerUnit: parseFloat(form.costPerUnit)
      });
      onAdd(res.data);  // pass the new item back to parent
      setForm({
        name: '',
        category: '',
        unit: '',
        quantity: '',
        costPerUnit: ''
      });
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  return (
  <form onSubmit={handleSubmit} style={styles.form}>
    <h2 style={styles.title}>Add New Inventory Item</h2>
    <input name="name" placeholder="Name" value={form.name} onChange={handleChange} style={styles.input} required />
        <select name="category" value={form.category} onChange={handleChange} required style={styles.input}>
            <option value="">-- Select Category --</option>
            <option value="Bread">Bread</option>
            <option value="Chicken">Chicken</option>
            <option value="Dairy">Dairy</option>
            <option value="Drinks">Drinks</option>
            <option value="Dry goods">Dry goods</option>
            <option value="Freezer">Freezer</option>
            <option value="Paper and Plastic">Paper and Plastic</option>
            <option value="Prepped food">Prepped food</option>
            <option value="Produce">Produce</option>
            <option value="Spices">Spices</option>
        </select>
    <input name="unit" placeholder="Unit" value={form.unit} onChange={handleChange} style={styles.input} required />
    <input name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} style={styles.input} type="number" required />
    <input name="costPerUnit" placeholder="Cost per Unit" value={form.costPerUnit} onChange={handleChange} style={styles.input} type="number" step="0.01" required />
    <button type="submit" style={styles.button}>Add Item</button>
  </form>
);
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxWidth: '400px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  input: {
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #aaa',
    borderRadius: '4px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  title: {
    marginBottom: '12px',
    textAlign: 'center',
  }
};

export default AddInventoryItem;