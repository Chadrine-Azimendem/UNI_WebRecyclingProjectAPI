import express from "express";

// //import controller and midlewares
import {
    getAllStocks,
    createOrder

} from "./ordersControllers.js";


const usersOrdersRouter = express.Router();

usersOrdersRouter.get("/api/stock", getAllStocks);
usersOrdersRouter.post("/api/orders", createOrder);

export default usersOrdersRouter;