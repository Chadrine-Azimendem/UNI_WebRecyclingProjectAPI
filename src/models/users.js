import { Sequelize, DataTypes } from "sequelize";
import sequelizeConnector from "../database/dbConnection.js";

const User = sequelizeConnector.define("user", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	},
	first_name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	surname: {
		type: Sequelize.STRING,
		allowNull: false
	},
	address: {
		type: Sequelize.STRING
	},
	postcode: {
		type: Sequelize.STRING
	},
	phone: {
		type: Sequelize.STRING
	},
	image: {
		type: Sequelize.BLOB("long"),
		allowNull: true
	},
	is_admin: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: 0
	}
});

export default User;
