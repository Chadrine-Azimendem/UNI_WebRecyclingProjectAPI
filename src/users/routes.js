import express from "express";

//import controller and midlewares
import {
	registerAUser,
	readUsers,
	updateUser,
	deleteUser,
	loginUser
} from "./controllers.js";
import { hashPassword } from "../middleware/authValidations.js";
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
// usersRouter.post("/login", checkPass, loginUser);
// usersRouter.post("/readUser", checkToken, readUsers);
usersRouter.put(
	"/updateDetails",
	// checkToken,
	// isPasswordValid,
	// hashPass,
	// isEmailValid,
	updateUser
);
// usersRouter.delete("/unsubscribe", checkToken, deleteUser);
// usersRouter.get("/authCheck", checkToken, loginUser);

export default usersRouter;
