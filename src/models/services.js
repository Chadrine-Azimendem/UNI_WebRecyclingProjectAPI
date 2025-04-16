import { Sequelize } from "sequelize";
import sequelizeConnector from "../database/dbConnection.js";

const Service = sequelizeConnector.define("service", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT("long")
    },
    monthlyPrice: {
        type: Sequelize.FLOAT(2)
    },
    oneTimePickup: {
        type: Sequelize.FLOAT(2),
        allowNull: false
    },
});

export default Service;
