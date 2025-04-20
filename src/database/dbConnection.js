import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); //cofigure environment variable file

/*Make the connection to the data base*/
const sequelizeConnector = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		dialect: "mysql",
		dialectOptions: {
			connectTimeout: 30000, // 30 seconds timeout
		},
		host: process.env.DB_HOST
	}
);

// Test the sequelize connection to database.
try {
	await sequelizeConnector.authenticate();
	console.log("Connection has been established successfully.");
} catch (error) {
	console.error("Unable to connect to the database:", error);
}

export default sequelizeConnector;