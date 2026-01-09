import express from "express"
import { createBlogPost, deleteBlogPostByIdSimple, getAllBlogPosts, getBlogPostById, getBlogsSummary, updateBlogPost } from "../controller/BlogController";
import uploadBlogImage from "../config/multer"


const blogRouter = express.Router()


blogRouter.post("/createblog", uploadBlogImage, createBlogPost);
blogRouter.get("/allblogs", getAllBlogPosts);
blogRouter.get("/getoneblog/:id", getBlogPostById);
blogRouter.delete("/deleteoneblog/:id", deleteBlogPostByIdSimple);
blogRouter.get("/updateoneblog/:id", updateBlogPost);
blogRouter.get("/getblogsummary", getBlogsSummary);


export default blogRouter;