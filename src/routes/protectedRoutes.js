import express from "express";
import { admin, manager, user } from "../controllers/protectedControllers.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middlewares/userMiddlewares.js";

const protectedRoutes = express.Router();

protectedRoutes.post(
  "/admin",
  roleMiddleware(["admin"]),
  authMiddleware,
  admin
);
protectedRoutes.post(
  "/manager",
  roleMiddleware(["admin", "manager"]),
  authMiddleware,
  manager
);
protectedRoutes.post("/user", user);

export default protectedRoutes;
