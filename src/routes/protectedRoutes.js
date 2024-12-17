import express from "express";
import { admin, manager, user } from "../controllers/protectedControllers.js";
import authMiddleware from "../middlewares/userMiddlewares.js";

const protectedRoutes = express.Router();

// Admin route (accessible by admin only)
protectedRoutes.post("/admin", authMiddleware(["admin"]), admin);

// Manager route (accessible by admin and manager)
protectedRoutes.post("/manager", authMiddleware(["manager", "admin"]), manager);

// User route (accessible by admin, manager, and user)
protectedRoutes.post("/user", authMiddleware(["user", "manager", "admin"]), user);

export default protectedRoutes;
