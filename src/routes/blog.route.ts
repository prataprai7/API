import { Router } from "express";
import { BlogController } from "../controllers/blog.controller";
import { authorizedMiddleware } from "../middleware/authorized.middleware";
const blogController = new BlogController();
const router = Router();

router.post(
    "/",
    authorizedMiddleware, // user should be logged in -> req.user
    blogController.createBlog
);
router.get(
    "/my-blogs",
    authorizedMiddleware,
    blogController.getBlogsByAuthorId
);
router.get(
    "/",
    blogController.getPaginatedBlogs
);

export default router;
