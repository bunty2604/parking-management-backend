
const express = require("express");
const cors = require("cors");

const parkingRoutes = require("./routes/parkingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Parking Management System API is running");
});

app.use("/api/parking", parkingRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
