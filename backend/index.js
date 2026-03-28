require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const PORT = process.env.PORT || 3001;
const uri = process.env.MONGO_URL;

const app = express();
const path = require("path");

app.use(bodyParser.json());
app.use(cors());

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use(express.static(path.join(__dirname, "../dashboard/build")));

// MongoDB Connection with proper SSL configuration
mongoose
  .connect(uri, {
    ssl: true,
    retryWrites: true,
    w: "majority",
  })
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});
app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});
app.post("/newOrder", async (req, res) => {
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });
  newOrder.save();
  res.send("Order saved!");
});

// Serve index.html for all unmatched routes (SPA support)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}!`);
  console.log(`DB started!`);
});
