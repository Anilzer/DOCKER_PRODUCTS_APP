require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/products", productRoutes);

// start
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

connectDB(MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(`✅ API running on http://localhost:${PORT}`));
});
