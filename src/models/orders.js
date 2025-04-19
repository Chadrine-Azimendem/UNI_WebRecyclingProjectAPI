import { DataTypes, Sequelize } from "sequelize";
import sequelizeConnector from "../database/dbConnection.js";

// Orders Table
export const Order = sequelizeConnector.define("order",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "userID",
        },
        total_amount: {
            type: DataTypes.FLOAT,
            allowNull: true,
            field: "totalAmount",
        },
        status: {
            type: DataTypes.STRING(45),
            defaultValue: "Pending",
            field: "status",
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            field: "createdAt",
        },
    },
    {
        tableName: "ordersTable",
        timestamps: false,
    }
);

// OrderItems Table
export const OrderItem = sequelizeConnector.define("orderItem",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "orderID",
        },
        stock_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "stockID",
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        unit_price: {
            type: DataTypes.FLOAT,
            allowNull: true,
            field: "unitPrice",
        },
    },
    {
        tableName: "orderItemsTable",
        timestamps: false,
    }
);