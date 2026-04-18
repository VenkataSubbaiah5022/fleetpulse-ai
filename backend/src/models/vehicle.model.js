const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  name: String,
  status: String,
  location: {
    lat: Number,
    lng: Number,
  },
  speed: Number,
});

module.exports = mongoose.model("Vehicle", vehicleSchema);