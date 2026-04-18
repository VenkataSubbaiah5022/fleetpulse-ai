const express = require("express");
const router = express.Router();

const {
  getAlerts,
  createAlert,
  resolveAlert,
} = require("../controllers/alert.controller");

router.get("/", getAlerts);
router.post("/", createAlert);
router.put("/:id/resolve", resolveAlert);

module.exports = router;
