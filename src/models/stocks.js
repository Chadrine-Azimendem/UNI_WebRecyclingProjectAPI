import { DataTypes } from "sequelize";
import sequelizeConnector from "../database/dbConnection.js";

// Stock Table
const Stock = sequelizeConnector.define("stock",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
            field: "productName",
        },
        description: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        stock_quantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: "stockQUANTITY",
        },
        image_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: "IMAGEURL",
        },
    },
    {
        tableName: "stockTable",
        timestamps: false,
    }
);

export default Stock;