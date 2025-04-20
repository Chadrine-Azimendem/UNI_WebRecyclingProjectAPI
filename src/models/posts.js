import { Sequelize } from "sequelize";
import sequelizeConnector from "../database/dbConnection.js";

//Define posts table.
const Post = sequelizeConnector.define("post", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.TEXT("long"),
		allowNull: false
	}
});

export default Post;