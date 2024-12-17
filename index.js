import express from "express";
import dotenv from "dotenv";
import Dbconnection from "./src/config/database.js";
import userRouter from "./src/routes/userRoutes.js";
import protectedRoutes from "./src/routes/protectedRoutes.js";

//env
dotenv.config();

//app
const app = express();

//middlewares
app.use(express.json());

//Routes
app.use("/api/auth", userRouter);
app.use("/api/user", protectedRoutes);

//DATABASE CONNECTION
Dbconnection();

//port
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
