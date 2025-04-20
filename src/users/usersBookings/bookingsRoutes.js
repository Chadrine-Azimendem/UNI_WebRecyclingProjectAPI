import express from "express";

// //import controller and midlewares
import { getAllMultiBookings, updateMultiBookings, getAllSingleBookings, updateSingleBooking, deleteSingleBooking } from "./bookingsControllers.js";


const usersBookingsRouter = express.Router();//set router

//Read booking data
usersBookingsRouter.get("/api/multi-bookings", getAllMultiBookings);
usersBookingsRouter.get("/api/single-bookings", getAllSingleBookings);

//update booking data
usersBookingsRouter.put("/api/multi-bookings/:id", updateMultiBookings);
usersBookingsRouter.put("/api/single-bookings/:id", updateSingleBooking);

//delete booking data
usersBookingsRouter.delete("/api/single-bookings/:id", deleteSingleBooking);

export default usersBookingsRouter;