import express from "express";
import { 
  register,
  login, 
} from "../controllers/userController.js";

const userRouter = express.Router();

// Authentication routes
userRouter.post("/register", register);
userRouter.post("/login", login);


export default userRouter;