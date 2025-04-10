import jwt from "jsonwebtoken";
import User from "../models/users.js";

export const registerAUser = async (req, res) => {
	try {
		let doesUserExist = await User.findOne({
			where: { username: req.body.username }
		});
		if (doesUserExist) {
			res.status(409).json({
				message: "Username is already in use!"
			});
		} else {
			const userObject = {
				email: req.body.email,
				username: req.body.username,
				password: req.body.password,
				first_name: req.body.firstName,
				surname: req.body.surname,
				address: req.body.address,
				postcode: req.body.postcode,
				phone: req.body.phone,
				image: req.body.image,
				is_admin: parseInt(req.body.role)
			};
			await User.create(userObject);
			res.status(201).send({
				success: true,
				message: `New user with username ${userObject.username} successfully created...`
			});
		}
	} catch (error) {
		console.log(error);
		// send internal error status and the error message
		res.status(400).send({ success: false, error: error.message });
	}
};

//Delete a user
export const deleteUser = async (req, res) => {
	try {
		await User.deleteOne({ username: req.body.username });
		res.status(202).send({
			success: true,
			message: `${req.body.username} has been deleted`
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ success: false, error: error.message });
	}
};

//Handle user athentication for login
export const loginUser = async (req, res) => {
	try {
		/*generate token for user session more information on jwt and how it is 
		used can be found here: https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
		#*/
		const usersToken = jwt.sign(req.body.username, process.env.JWT_SECRET);
		res.status(200).json({
			success: true,
			username: req.matchingUser.username,
			email: req.matchingUser.email,
			type: req.matchingUser.is_admin,
			usersToken
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ success: false, error: error.message });
	}
};

//Update a user
export const updateUser = async (req, res) => {
	try {
		// define the filter
		const filter = { username: req.body.username };
		// define the field that is being updated
		const update = { [req.body.key]: req.body.value };

		let updatedUser = await User.findOneAndUpdate(filter, update, {
			new: true // returns the updated values
		});
		console.log(updatedUser);
		res.status(200).send({
			success: true,
			message: `the ${req.body.key} has been updated to ${req.body.value}`,
			key: req.body.key,
			value: req.body.value
		});
	} catch (error) {
		console.log(error);
		// send internal error status and the error message
		res.status(400).send({ success: false, error: error.message });
	}
};
