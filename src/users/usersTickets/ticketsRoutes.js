import express from "express";
//import controller and midlewares
import { getAllTickets, updateATicket, deleteATicket } from "./ticketsControllers.js";

const usersTicketsRouter = express.Router();

usersTicketsRouter.get("/api/tickets", getAllTickets);
usersTicketsRouter.put("/api/tickets/:id", updateATicket);
usersTicketsRouter.delete("/api/tickets/:id", deleteATicket)

export default usersTicketsRouter;