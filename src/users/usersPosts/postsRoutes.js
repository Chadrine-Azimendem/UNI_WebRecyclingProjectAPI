import express from "express";

// //import controller and midlewares
import {
	getAllPosts,
	createAPost
} from "./postsControllers.js";


const usersPostsRouter = express.Router();

usersPostsRouter.get("/posts", getAllPosts);
usersPostsRouter.post("/post", createAPost);

export default usersPostsRouter;