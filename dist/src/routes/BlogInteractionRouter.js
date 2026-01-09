"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BlogInteractionController_1 = require("../controller/BlogInteractionController");
const commentRouter = express_1.default.Router();
commentRouter.post('/blogs/:id/like', BlogInteractionController_1.likeBlogPost);
commentRouter.post('/blogs/:id/unlike', BlogInteractionController_1.unlikeBlogPost);
commentRouter.get('/blogs/:id/check-like', BlogInteractionController_1.checkUserLike);
commentRouter.get('/blogs/:id/like-count', BlogInteractionController_1.getLikeCount);
commentRouter.get('/blogs/:id/check-like-with-count', BlogInteractionController_1.checkUserLikeWithCount);
commentRouter.post('/blogs/:id/addcomments', BlogInteractionController_1.addComment);
commentRouter.get('/blogs/:id/getcomments', BlogInteractionController_1.getComments);
commentRouter.get('/blogs/:id/comment-count', BlogInteractionController_1.getCommentCount);
commentRouter.get("/comment/user/:username", BlogInteractionController_1.getCommentsByUsername);
exports.default = commentRouter;
