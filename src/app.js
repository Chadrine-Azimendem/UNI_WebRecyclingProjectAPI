import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import sequelizeConnector from "./database/dbConnection.js";

//import all models
import User from "./models/users.js";
import Post from "./models/posts.js";
import { SingleBooking, MultiBooking } from "./models/Bookings.js";
import { Order, OrderItem } from "./models/orders.js";
import Stock from "./models/stocks.js";
import Ticket from "./models/tickets.js";

//import all routes
import usersRouter from "./users/routes.js";
import usersPostsRouter from "./users/usersPosts/postsRoutes.js";
import quoteRouter from "./quotes/routes.js"
import usersTicketsRouter from "./users/usersTickets/ticketsRoutes.js";
import usersBookingsRouter from "./users/usersBookings/bookingsRoutes.js";
import usersOrdersRouter from "./users/usersOrders/ordersRoutes.js";


// Set up Express server
const app = express(); //start the express app
const PORT = process.env.PORT;

app.use(bodyParser.json()); //parse request body

app.use(cors());// use cors to allow cross origin source sharing
app.use(express.json({ limit: 52428800 }))
app.use(express.urlencoded({ limit: 52428800, extended: true }));
app.use("/images", express.static("../Assets/Images"));

//Use all the routes
app.use("/user", usersRouter);
app.use("/", usersPostsRouter);
app.use("/quotes", quoteRouter);
app.use("/", usersTicketsRouter);
app.use("/", usersBookingsRouter);
app.use("/", usersOrdersRouter);

// Define Relationships between models
User.hasMany(Post, { foreignKey: "userId", as: "posts" });
Post.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

Stock.hasMany(OrderItem, { foreignKey: "stock_id" });
OrderItem.belongsTo(Stock, { foreignKey: "stock_id" });

User.hasMany(MultiBooking, { foreignKey: "userid" });
MultiBooking.belongsTo(User, { foreignKey: "userid" });

User.hasMany(SingleBooking, { foreignKey: "userid" });
SingleBooking.belongsTo(User, { foreignKey: "userid" });

User.hasMany(Ticket, { foreignKey: "account" });
Ticket.belongsTo(User, { foreignKey: "account" });

//Synch the models to mysql tables using the sync() method from the sequelize instance
sequelizeConnector
	// .sync({ force: true }) //run the force sync to alter tables later
	.sync()
	.then((result) => {
		console.log(`Models successfully synched with mysql table: ${result}`);
	})
	.catch((err) => {
		console.log(`Error whilst synching models to database: ${err}`);
	});

//set the port to run the app.
app.listen(PORT, () => {
	console.log(`App running on port: ${PORT}`);
});