import express from "express";

// //import controller and midlewares
import { getAService, getAllServicesForBusiness, getAllServicesForHouses } from "./quotesControllers.js";

const quoteRouter = express.Router();

quoteRouter.post("/quote", getAService);
quoteRouter.get("/businessWaste", getAllServicesForBusiness);
quoteRouter.get("/domesticWaste", getAllServicesForHouses);

export default quoteRouter;