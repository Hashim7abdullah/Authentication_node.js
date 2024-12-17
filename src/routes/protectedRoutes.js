import express from "express";
import { admin, manager, user } from "../controllers/protectedControllers.js";
import { roleMiddleware } from "../middlewares/userMiddlewares.js";

const protectedRoutes = express.Router();

protectedRoutes.post("/admin",roleMiddleware(['admin']), admin);
protectedRoutes.post("/manager",roleMiddleware(['admin , manager']), manager);
protectedRoutes.post("/user", user);

export default protectedRoutes;
