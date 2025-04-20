import express from "express";

//import controller and midlewares
import {
	registerAUser,
	updateUser,
	deleteUser,
	loginUser,
	getBookingsAndSalesTotals
} from "./controllers.js";
import { hashPassword, checkPass, verifyToken, checkOldPassword } from "../middleware/authValidations.js";
import {
	isPasswordValid,
	isEmailValid
} from "../middleware/userValidations.js";

const usersRouter = express.Router();

usersRouter.post(
	"/register",
	isEmailValid,
	isPasswordValid,
	hashPassword,
	registerAUser
);
usersRouter.post("/login", checkPass, loginUser);
// usersRouter.post("/readUser", checkToken, readUsers);
usersRouter.put(
	"/updateDetails",
	isPasswordValid,
	checkOldPassword,
	updateUser
);

usersRouter.get("/statistics", getBookingsAndSalesTotals);

// usersRouter.delete("/unsubscribe", checkToken, deleteUser);


export default usersRouter;
