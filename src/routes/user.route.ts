import { UserController } from "../controllers/user.controller";
import { Router } from "express";
import { authorizedMiddleware } from "../middleware/authorized.middleware";
import { uploads } from "../middleware/upload.middleware";

const userController = new UserController();
const router = Router();

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);

router.post(
    "/update",
    authorizedMiddleware, //user should be logged in
    uploads.single("profileImage"), //multer for file upload -> req.file
    userController.updateUser
);

export default router;