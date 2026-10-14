
const TOTAL_SLOTS = 10;

const parkingSlots = new Map();
const parkingHistory = [];

for (let i = 1; i <= TOTAL_SLOTS; i++) {
    parkingSlots.set(i, null);
}

function getParkingStatus(req, res) {
    const slots = [];

    for (const [slotNumber, vehicle] of parkingSlots) {
        slots.push({
            slotNumber,
            status: vehicle ? "Occupied" : "Available",
            vehicle
        });
    }

    const occupiedSlots = slots.filter(
        slot => slot.status === "Occupied"
    ).length;

    res.json({
        totalSlots: TOTAL_SLOTS,
        availableSlots: TOTAL_SLOTS - occupiedSlots,
        occupiedSlots,
        slots
    });
}

function vehicleEntry(req, res) {
    const { vehicleNumber, vehicleType } = req.body;

    if (!vehicleNumber || !vehicleType) {
        return res.status(400).json({
            message: "Vehicle number and vehicle type are required"
        });
    }

    const number = vehicleNumber.trim().toUpperCase();
    const type = vehicleType.trim().toLowerCase();

    if (!number || !["car", "bike"].includes(type)) {
        return res.status(400).json({
            message: "Enter a valid vehicle number and type (car or bike)"
        });
    }

    for (const vehicle of parkingSlots.values()) {
        if (vehicle && vehicle.vehicleNumber === number) {
            return res.status(409).json({
                message: "This vehicle is already parked"
            });
        }
    }

    for (const [slotNumber, vehicle] of parkingSlots) {
        if (vehicle === null) {
            const newVehicle = {
                vehicleNumber: number,
                vehicleType: type,
                entryTime: Date.now()
            };

            parkingSlots.set(slotNumber, newVehicle);

            return res.status(201).json({
                message: "Vehicle parked successfully",
                slotNumber,
                vehicle: newVehicle
            });
        }
    }

    return res.status(409).json({
        message: "Parking is full. No slots available."
    });
}


function vehicleExit(req, res) {
    const { vehicleNumber } = req.body;

    if (!vehicleNumber || !vehicleNumber.trim()) {
        return res.status(400).json({
            message: "Vehicle number is required"
        });
    }

    const number = vehicleNumber.trim().toUpperCase();

    for (const [slotNumber, vehicle] of parkingSlots) {
        if (vehicle && vehicle.vehicleNumber === number) {
            const exitTime = Date.now();
            const durationMs = exitTime - vehicle.entryTime;

            const hours = Math.max(
                1,
                Math.ceil(durationMs / (1000 * 60 * 60))
            );

            const bill = 30 + (hours - 1) * 10;

            const session = {
                vehicleNumber: vehicle.vehicleNumber,
                vehicleType: vehicle.vehicleType,
                slotNumber,
                entryTime: vehicle.entryTime,
                exitTime,
                hours,
                bill
            };

            parkingHistory.push(session);
            parkingSlots.set(slotNumber, null);

            return res.status(200).json({
                message: "Vehicle checked out successfully",
                receipt: session
            });
        }
    }

    return res.status(404).json({
        message: "Vehicle is not currently parked"
    });
}



function getParkingHistory(req, res) {
    res.json({
        totalRecords: parkingHistory.length,
        history: parkingHistory
    });
}



function getDashboard(req, res) {
    let occupiedSlots = 0;

    for (const vehicle of parkingSlots.values()) {
        if (vehicle !== null) {
            occupiedSlots++;
        }
    }

    const totalEarnings = parkingHistory.reduce(
        (total, session) => total + session.bill,
        0
    );

    res.json({
        totalSlots: TOTAL_SLOTS,
        availableSlots: TOTAL_SLOTS - occupiedSlots,
        occupiedSlots,
        totalCompletedSessions: parkingHistory.length,
        totalEarnings
    });
}



module.exports = {
    parkingSlots,
    parkingHistory,
    getParkingStatus,
    vehicleEntry,
    vehicleExit,
    getParkingHistory,
    getDashboard
};
