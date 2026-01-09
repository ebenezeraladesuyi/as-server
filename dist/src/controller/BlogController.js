"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogPost = exports.deleteBlogPostByIdSimple = exports.getBlogsSummary = exports.getBlogPostById = exports.getAllBlogPosts = exports.createBlogPost = void 0;
const BlogModel_1 = require("../model/BlogModel");
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
// Upload blog image to Cloudinary and create new blog post
const createBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }
        // Upload image to Cloudinary
        const result = yield cloudinary_1.default.uploader.upload(req.file.path, {
            folder: 'blogs' // Optional: Folder in Cloudinary where images will be stored
        });
        // Create new blog post with Cloudinary URL
        const newBlogPost = new BlogModel_1.blogModel({
            blogImage: result.secure_url,
            author: req.body.author,
            title: req.body.title,
            details: req.body.details
        });
        yield newBlogPost.save();
        // Fetch all blog posts sorted by createdAt timestamp in descending order
        const allBlogPosts = yield BlogModel_1.blogModel.find().sort({ createdAt: -1 });
        res.status(201).json(allBlogPosts);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createBlogPost = createBlogPost;
// Get all blog posts
const getAllBlogPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogPosts = yield BlogModel_1.blogModel.find();
        res.status(200).json(blogPosts);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllBlogPosts = getAllBlogPosts;
// Get one blog post by ID
const getBlogPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const blogPost = yield BlogModel_1.blogModel.findById(id);
        if (blogPost) {
            res.status(200).json(blogPost);
        }
        else {
            res.status(404).json({ message: 'Blog post not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getBlogPostById = getBlogPostById;
const getBlogsSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogPosts = yield BlogModel_1.blogModel.find()
            .select('_id title author createdAt blogImage')
            .sort({ createdAt: -1 });
        res.status(200).json(blogPosts);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getBlogsSummary = getBlogsSummary;
// delete one blog
const deleteBlogPostByIdSimple = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedBlogPost = yield BlogModel_1.blogModel.findByIdAndDelete(id);
        if (deletedBlogPost) {
            // Get updated list of blog posts
            const updatedBlogPosts = yield BlogModel_1.blogModel.find().sort({ createdAt: -1 });
            res.status(200).json({
                message: 'Blog post deleted successfully',
                deletedBlogPost,
                blogPosts: updatedBlogPosts
            });
        }
        else {
            res.status(404).json({ message: 'Blog post not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteBlogPostByIdSimple = deleteBlogPostByIdSimple;
// Update one blog post
const updateBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { author, title, details } = req.body;
    try {
        const updatedData = { author, title, details };
        // If there's a new image file, upload it to Cloudinary
        if (req.file) {
            // Upload new image to Cloudinary
            const result = yield cloudinary_1.default.uploader.upload(req.file.path, {
                folder: 'blogs'
            });
            updatedData.blogImage = result.secure_url;
            // Optionally delete old image from Cloudinary
            // You can extract and delete old image if needed
        }
        const updatedBlogPost = yield BlogModel_1.blogModel.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (updatedBlogPost) {
            res.status(200).json(updatedBlogPost);
        }
        else {
            res.status(404).json({ message: 'Blog post not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateBlogPost = updateBlogPost;
