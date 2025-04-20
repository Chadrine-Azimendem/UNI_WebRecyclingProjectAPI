import { MultiBooking, SingleBooking } from "../../models/Bookings.js";

/***API Endpoints for Multi-Bookings ***/
// Get all multi-bookings for a user
export const getAllMultiBookings = async (req, res) => {
    const userId = req.query.userId;
    try {
        const bookings = await MultiBooking.findAll({ where: { userid: userId } });
        res.json(bookings);
    } catch (error) {
        console.error("Error fetching multi-bookings:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update a multi-booking
export const updateMultiBookings = async (req, res) => {
    const bookingId = parseInt(req.params.id);
    const { startdate, enddate, collectday, address, itemtype, binsize } =
        req.body;

    try {
        const booking = await MultiBooking.findByPk(bookingId);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        // Validate start date (cannot be in the past)
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to start of today
        const startDateObj = new Date(startdate);
        if (startDateObj < today) {
            return res
                .status(400)
                .json({ error: "Start date cannot be in the past" });
        }

        // Validate end date (if provided, must be after start date)
        if (enddate) {
            const endDateObj = new Date(enddate);
            if (endDateObj <= startDateObj) {
                return res
                    .status(400)
                    .json({ error: "End date must be after start date" });
            }
        }

        // Validate itemtype
        const validItemTypes = ["Paper", "Plastic", "Electronics", "Glass"];
        if (!validItemTypes.includes(itemtype)) {
            return res.status(400).json({
                error: "Item type must be one of: Paper, Plastic, Electronics, Glass",
            });
        }

        // Validate binsize
        const validBinSizes = ["Small", "Medium", "Big"];
        if (!validBinSizes.includes(binsize)) {
            return res
                .status(400)
                .json({ error: "Bin size must be one of: Small, Medium, Big" });
        }

        // Calculate price (example logic, adjust as needed)
        const basePrice = 10; // Base price per collection
        const binSizeMultiplier = { Small: 1, Medium: 1.5, Big: 2 };
        const itemTypeMultiplier = {
            Paper: 1,
            Plastic: 1.2,
            Electronics: 1.5,
            Glass: 1.3,
        };
        const price =
            basePrice * binSizeMultiplier[binsize] * itemTypeMultiplier[itemtype];

        await booking.update({
            startdate,
            enddate,
            collectday,
            address,
            itemtype,
            price, // Price is calculated, not taken from user input
            binsize,
        });

        res.json({ message: "Booking updated successfully" });
    } catch (error) {
        console.error("Error updating multi-booking:", error);
        res.status(500).json({ error: "Internal server error: " + error.message });
    }
};

/***API Endpoints for Single-Bookings ***/

//Get all single-bookings for a user
export const getAllSingleBookings = async (req, res) => {
    const userId = req.query.userId;
    try {
        const bookings = await SingleBooking.findAll({ where: { userid: userId } });
        res.json(bookings);
    } catch (error) {
        console.error("Error fetching single-bookings:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

//Update a single-booking
export const updateSingleBooking = async (req, res) => {
    const bookingId = parseInt(req.params.id);
    const { datetime, address, itemtype, price } = req.body;
    try {
        const booking = await SingleBooking.findByPk(bookingId);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        await booking.update({
            datetime,
            address,
            itemtype,
            price,
        });

        res.json({ message: "Booking updated successfully" });
    } catch (error) {
        console.error("Error updating single-booking:", error);
        res.status(500).json({ error: "Internal server error: " + error.message });
    }
};

// Delete a single-booking
export const deleteSingleBooking = async (req, res) => {
    const bookingId = parseInt(req.params.id);
    try {
        const booking = await SingleBooking.findByPk(bookingId);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        await booking.destroy();
        res.json({ message: "Booking deleted successfully" });
    } catch (error) {
        console.error("Error deleting single-booking:", error);
        res.status(500).json({ error: "Internal server error: " + error.message });
    }
};