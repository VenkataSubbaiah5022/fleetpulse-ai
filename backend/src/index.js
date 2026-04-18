const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("FleetPulse Backend Running 🚀");
});

const vehicleRoutes = require("./routes/vehicle.routes");

app.use("/api/vehicles", vehicleRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});