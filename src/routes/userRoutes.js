import express from "express";
import { 
  register,
  login, 
  logout, 
} from "../controllers/userController.js";

const userRouter = express.Router();

// Authentication routes
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

// Protected route example

export default userRouter;