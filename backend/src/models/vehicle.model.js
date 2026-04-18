const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  registrationNumber: { type: String, required: true, unique: true },
  status: { type: String, enum: ['Active', 'Inactive', 'Maintenance'], default: 'Active' },
  model: { type: String },
  year: { type: Number },
  location: {
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 },
  },
  speed: { type: Number, default: 0 },
  fuelLevel: { type: Number, default: 100 }, // percentage
  fuelEfficiency: { type: Number, default: 0 }, // km/l
  batteryHealth: { type: Number, default: 100 }, // percentage
  tireCondition: { type: String, enum: ['Good', 'Fair', 'Poor'], default: 'Good' },
  assignedDriver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);