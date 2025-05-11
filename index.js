const express = require('express');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('SSHG365-Inventory API is running');
});

// Create inventory item
app.post('/inventory', async (req, res) => {
  const { name, category, unit, quantity, costPerUnit } = req.body;

  try {
    const newItem = await prisma.inventoryItem.create({
      data: { name, category, unit, quantity, costPerUnit },
    });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create inventory item' });
  }
});

// Get all inventory items
app.get('/inventory', async (req, res) => {
  try {
    const items = await prisma.inventoryItem.findMany();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory items' });
  }
});
// Delete an Inventory item
app.delete('/inventory/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.inventoryItem.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});
//Edit an inventory item
app.put('/inventory/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category, unit, quantity, costPerUnit } = req.body;

  try {
    const updatedItem = await prisma.inventoryItem.update({
      where: { id: parseInt(id) },
      data: { name, category, unit, quantity, costPerUnit },
    });

    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update item' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

});