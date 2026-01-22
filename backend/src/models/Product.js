const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, default: "" }
  },
  { timestamps: true } // => createdAt + updatedAt auto
);

module.exports = mongoose.model("Product", productSchema);
