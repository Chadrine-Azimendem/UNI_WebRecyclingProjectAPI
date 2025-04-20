import express from "express";

//import controller and midlewares for users routes
import { registerAUser, updateUser, loginUser, getBookingsAndSalesTotals } from "./controllers.js";
import { hashPassword, checkPass, checkOldPassword } from "../middleware/authValidations.js";
import { isPasswordValid, isEmailValid } from "../middleware/userValidations.js";

const usersRouter = express.Router();

usersRouter.post("/register", isEmailValid, isPasswordValid, hashPassword, registerAUser);

usersRouter.post("/login", checkPass, loginUser);

usersRouter.put("/updateDetails", isPasswordValid, checkOldPassword, updateUser);

usersRouter.get("/statistics", getBookingsAndSalesTotals);

export default usersRouter;