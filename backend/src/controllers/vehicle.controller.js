const Vehicle = require("../models/vehicle.model");

// Get all vehicles
exports.getVehicles = async (req, res) => {
  const vehicles = await Vehicle.find();
  res.json(vehicles);
};

// Create vehicle
exports.createVehicle = async (req, res) => {
  const vehicle = await Vehicle.create(req.body);
  res.json(vehicle);
};