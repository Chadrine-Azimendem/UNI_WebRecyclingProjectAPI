import { Sequelize } from "sequelize";
import sequelizeConnector from "../database/dbConnection.js";

const SalesStats = sequelizeConnector.define("monthlyVolumeRecycledTotals", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    startDate: {
        type: Sequelize.DATE,
    },
    Electronics: {
        type: Sequelize.INTEGER,
    },
    Clothing: {
        type: Sequelize.INTEGER,
    },
    AutoParts: {
        type: Sequelize.INTEGER,
    },
    BuildingMaterials: {
        type: Sequelize.INTEGER,
    },
    HouseFurniture: {
        type: Sequelize.INTEGER,
    },
    Plastic: {
        type: Sequelize.INTEGER,
    },
    Glass: {
        type: Sequelize.INTEGER,
    },
    Paper: {
        type: Sequelize.INTEGER,
    }
});

export default SalesStats;
