import express from "express";
import cors from "cors";
import sequelizeConnector from "./database/dbConnection.js";
import User from "./models/users.js";
import Post from "./models/posts.js";
import usersRouter from "./users/routes.js";
import usersPostsRouter from "./users/usersPosts/routes.js";
import bodyParser from "body-parser";

const app = express(); //start the express app
const PORT = process.env.PORT;

app.use(bodyParser.json()); //parse request body

app.use(cors());// use cors to allow cross origin source sharing
app.use(express.json({ limit: 52428800 }))
app.use(express.urlencoded({ limit: 52428800, extended: true }));
app.use("/user", usersRouter);
app.use("/", usersPostsRouter);

//define one to many relation
User.hasMany(Post, { foreignKey: "userId", as: "posts" });
Post.belongsTo(User, { foreignKey: "userId", as: "user" });

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
