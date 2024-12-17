import express from "express";
import { admin, manager, user } from "../controllers/protectedControllers.js";

const protectedRoutes = express.Router();

protectedRoutes.post("/admin", admin);
protectedRoutes.post("/manager", manager);
protectedRoutes.post("/user", user);

export default protectedRoutes;
