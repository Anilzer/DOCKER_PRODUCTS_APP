const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");

const router = express.Router();

// GET /api/products => liste
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    console.log(`✅ ${products.length} produit(s) trouvé(s)`);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products/:id => détail
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    console.log("✅ Produit trouvé :", product.name);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/products => ajout
router.post("/", async (req, res) => {
  try {
    const { name, price, description } = req.body;

    // validation simple
    if (!name || price === undefined) {
      return res.status(400).json({ message: "name and price are required" });
    }

    const created = await Product.create({
      name,
      price,
      description
    });

    console.log("✅ Produit créé avec succès :", created._id);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/products/:id => modification
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const updated = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) return res.status(404).json({ message: "Product not found" });

    console.log("✅ Produit modifié :", updated._id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/products/:id => suppression
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });

    console.log("✅ Produit supprimé :", deleted._id);
    res.json({ message: "Product deleted", id: deleted._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
