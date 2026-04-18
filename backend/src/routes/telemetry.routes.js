const express = require("express");
const router = express.Router();

const {
  getTelemetry,
  createTelemetry,
} = require("../controllers/telemetry.controller");

router.get("/", getTelemetry);
router.post("/", createTelemetry);

module.exports = router;
