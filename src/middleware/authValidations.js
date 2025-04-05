import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/users.js";

//Hash the password before saving in database
export const hashPassword = async (req, res, next) => {
	try {
		req.body.password = await bcrypt.hash(req.body.password, 10);
		next();
	} catch (error) {
		console.log(error);
		res.status(500).send({ success: false, error: error.message });
	}
};

export const checkPass = async (req, res, next) => {
	try {
		req.user = await User.findOne({ username: req.body.username });
		if (
			req.user &&
			(await bcrypt.compare(req.body.password, req.user.password))
		) {
			console.log("password is correct");
			next();
		} else {
			throw new Error("incorrect username or password");
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({ success: false, error: error.message });
	}
};

export const checkToken = async (req, res, next) => {
	try {
		if (!req.header("Authorization")) {
			console.log("no token passed");
			throw new Error("no token passed");
		}
		const token = req.header("Authorization").replace("Bearer ", "");
		const decodedToken = await jwt.verify(token, process.env.SECRET);
		req.user = await User.findById(decodedToken.id_);
		if (req.user) {
			req.authUser = req.user;
			next();
		} else {
			throw new Error("user is not authorised");
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({ success: false, error: error.message });
	}
};
