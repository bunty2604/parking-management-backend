
const express = require("express");
const router = express.Router();

const {
    getParkingStatus,
    vehicleEntry,
    vehicleExit, 
    getParkingHistory,
    getDashboard
} = require("../controllers/parkingController");

router.get("/status", getParkingStatus);
router.post("/entry", vehicleEntry);
router.post("/exit", vehicleExit);
router.get("/history", getParkingHistory);
router.get("/dashboard", getDashboard);

module.exports = router;
