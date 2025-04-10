import { Sequelize } from "sequelize";
import sequelizeConnector from "../database/dbConnection.js";

const Post = sequelizeConnector.define("posts", {
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
