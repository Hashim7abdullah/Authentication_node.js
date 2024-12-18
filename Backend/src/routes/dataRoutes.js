import express from "express";
import { userData, fetchdata } from "../controllers/userData.js";

const usersRoute = express.Router();

// Authentication routes
usersRoute.post("/create-users", userData);
usersRoute.get("/get-users", fetchdata);

export default usersRoute;
