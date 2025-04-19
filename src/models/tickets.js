import { DataTypes } from "sequelize";
import sequelizeConnector from "../database/dbConnection.js";

// Ticket model
const Ticket = sequelizeConnector.define("ticket",
    {
        ticketid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        account: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        subject: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        adminResponce: {
            // Changed from adminResponse to match the database column name
            type: DataTypes.TEXT,
            allowNull: true,
        },
        datetime: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
    },
    {
        tableName: "tickets",
        timestamps: false,
    }
);

export default Ticket;