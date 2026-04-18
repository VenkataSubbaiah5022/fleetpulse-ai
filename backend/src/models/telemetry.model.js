const mongoose = require('mongoose');

const telemetrySchema = new mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  speed: { type: Number, required: true },
  fuelLevel: { type: Number },
  rpm: { type: Number },
}, { timestamps: true });

telemetrySchema.index({ createdAt: 1 });

module.exports = mongoose.model('Telemetry', telemetrySchema);
