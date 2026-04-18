const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  licenseNumber: { type: String, required: true, unique: true },
  phone: { type: String },
  status: { type: String, enum: ['Active', 'Off-Duty', 'On Leave'], default: 'Active' },
  safetyScore: { type: Number, default: 100 }, // 0-100 score based on behavior
  totalHoursDriven: { type: Number, default: 0 },
  recentBehaviorFlags: [{
    type: String, // e.g., 'Harsh Braking', 'Overspeeding'
    timestamp: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Driver', driverSchema);
