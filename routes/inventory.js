const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all inventory items
router.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM inventory ORDER BY name");
  res.json(result.rows);
});

// ADD new item
router.post("/", async (req, res) => {
  const { name, quantity, unit, category, low_stock_threshold } = req.body;
  const result = await db.query(
    "INSERT INTO inventory (name, quantity, unit, category, low_stock_threshold) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, quantity, unit, category, low_stock_threshold]
  );
  res.status(201).json(result.rows[0]);
});

// UPDATE item quantity
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const result = await db.query(
    "UPDATE inventory SET quantity = $1 WHERE id = $2 RETURNING *",
    [quantity, id]
  );
  res.json(result.rows[0]);
});

// DELETE item
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM inventory WHERE id = $1", [id]);
  res.sendStatus(204);
});

module.exports = router;
