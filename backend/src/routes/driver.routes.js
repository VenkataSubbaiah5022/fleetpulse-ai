const express = require("express");
const router = express.Router();

const {
  getDrivers,
  createDriver,
  updateDriver,
} = require("../controllers/driver.controller");

router.get("/", getDrivers);
router.post("/", createDriver);
router.put("/:id", updateDriver);

module.exports = router;
