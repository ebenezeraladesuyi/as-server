import express from "express"
import { createBlogPost, getAllBlogPosts, getBlogPostById } from "../controller/BlogController";
import uploadBlogImage from "../config/multer"


const blogRouter = express.Router()


blogRouter.post("/creatblog", uploadBlogImage, createBlogPost);
blogRouter.get("/allblogs", getAllBlogPosts);
blogRouter.get("/getoneblog/:id", getBlogPostById);


export default blogRouter;