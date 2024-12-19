import express from "express";
import {
  userData,
  fetchdata,
  updateData,
  deleteUser,
} from "../controllers/userData.js";

const usersRoute = express.Router();

// Authentication routes
usersRoute.post("/create-users", userData);
usersRoute.get("/get-users", fetchdata);
usersRoute.put("/update-users/:id", updateData);
usersRoute.delete("/delete-users/:id", deleteUser);
export default usersRoute;
