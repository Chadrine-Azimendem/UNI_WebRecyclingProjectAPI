import { Sequelize } from "sequelize";
import sequelizeConnector from "../database/dbConnection.js";

const BookingStats = sequelizeConnector.define("monthlyBookingsStats", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    startDate: {
        type: Sequelize.DATE,
    },
    single: {
        type: Sequelize.INTEGER,
    },
    recurring: {
        type: Sequelize.INTEGER,
    },
    singleHouseFurniture: {
        type: Sequelize.INTEGER,
    },
    recHouseFurniture: {
        type: Sequelize.INTEGER,
    },
    singleElectronics: {
        type: Sequelize.INTEGER,
    },
    recElectronics: {
        type: Sequelize.INTEGER,
    },
    singleClothing: {
        type: Sequelize.INTEGER,
    },
    recClothing: {
        type: Sequelize.INTEGER,
    },
    singleAutoParts: {
        type: Sequelize.INTEGER,
    },
    recAutoParts: {
        type: Sequelize.INTEGER,
    },
    singleBuildingmaterials: {
        type: Sequelize.INTEGER,
    },
    recBuildingMaterials: {
        type: Sequelize.INTEGER,
    },
    singlePlastic: {
        type: Sequelize.INTEGER,
    },
    recPlastic: {
        type: Sequelize.INTEGER,
    },
    singlePaper: {
        type: Sequelize.INTEGER,
    },
    recPaper: {
        type: Sequelize.INTEGER,
    },
    singleGlass: {
        type: Sequelize.INTEGER,
    },
    recGlass: {
        type: Sequelize.INTEGER,
    }
});

export default BookingStats;
