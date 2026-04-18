const Vehicle = require("../models/vehicle.model");
const Alert = require("../models/alert.model");

exports.getDashboardKPIs = async (req, res) => {
  try {
    const totalVehicles = await Vehicle.countDocuments();
    const activeVehicles = await Vehicle.countDocuments({ status: 'Active' });
    
    // Get start of today to find today's alerts
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const alertsToday = await Alert.countDocuments({ createdAt: { $gte: startOfToday } });
    
    // Average fuel efficiency
    const vehicles = await Vehicle.find({ fuelEfficiency: { $gt: 0 } });
    const avgFuelEfficiency = vehicles.length > 0 
      ? (vehicles.reduce((acc, v) => acc + v.fuelEfficiency, 0) / vehicles.length).toFixed(1)
      : 0;
      
    res.json({
      totalVehicles,
      activeVehicles,
      alertsToday,
      avgFuelEfficiency: `${avgFuelEfficiency} km/l`
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
