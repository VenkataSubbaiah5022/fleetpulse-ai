const express = require("express");
const router = express.Router();

const { protect, restrictTo } = require("../middlewares/auth.middleware");

const {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle
} = require("../controllers/vehicle.controller");

router.use(protect);

router.get("/", getVehicles);
router.get("/:id", getVehicleById);
router.post("/", restrictTo("admin", "dispatcher"), createVehicle);
router.put("/:id", restrictTo("admin", "dispatcher"), updateVehicle);
router.delete("/:id", restrictTo("admin"), deleteVehicle);


module.exports = router;