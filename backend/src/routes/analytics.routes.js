const express = require("express");
const router = express.Router();

const {
  getDashboardKPIs,
} = require("../controllers/analytics.controller");

router.get("/", getDashboardKPIs);

module.exports = router;
