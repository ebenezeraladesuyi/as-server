import express from 'express';
import {
    likeBlogPost,
    unlikeBlogPost,
    addComment,
    getComments,
    checkUserLike,
    getCommentsByUsername,
    checkUserLikeWithCount,
    getCommentCount,
    getLikeCount
} from '../controller/BlogInteractionController';

const commentRouter = express.Router();

// Like routes
commentRouter.post('/blogs/:id/like', likeBlogPost);
commentRouter.post('/blogs/:id/unlike', unlikeBlogPost);
commentRouter.get('/blogs/:id/check-like', checkUserLike);
commentRouter.get('/blogs/:id/like-count', getLikeCount);  
commentRouter.get('/blogs/:id/comment-count', getCommentCount); 
commentRouter.get('/blogs/:id/check-like-with-count', checkUserLikeWithCount); 

// Comment routes
commentRouter.post('/blogs/:id/addcomments', addComment);
commentRouter.get('/blogs/:id/getcomments', getComments);

// comments by username
commentRouter.get("/comment/user/:username", getCommentsByUsername)

export default commentRouter;