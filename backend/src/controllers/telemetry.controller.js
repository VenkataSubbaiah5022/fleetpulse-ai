const Telemetry = require("../models/telemetry.model");

exports.getTelemetry = async (req, res) => {
  try {
    const { vehicleId, limit = 100 } = req.query;
    const filter = vehicleId ? { vehicleId } : {};
    const telemetry = await Telemetry.find(filter).sort({ createdAt: -1 }).limit(parseInt(limit));
    res.json(telemetry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTelemetry = async (req, res) => {
  try {
    const telemetry = await Telemetry.create(req.body);
    res.status(201).json(telemetry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
