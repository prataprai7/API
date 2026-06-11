import { Router } from "express";
import { UserController } from "./src/controllers/user.controller";

import { authorizedMiddleware } from "./src/middleware/authorized.middleware";
import { uploads } from "./src/middleware/upload.middleware";
const userController = new UserController();
const router = Router();

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.post(
    "/update",
    authorizedMiddleware ,// users should be logged in
    uploads.single("profileImage"), // multer for file upload -- req.file
    userController.updateUser
);


export default router;