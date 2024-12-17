import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";

// Import routes
import userRouter from "./src/routes/userRoutes.js";
import protectedRoutes from "./src/routes/protectedRoutes.js";
import Dbconnection from "./src/config/database.js";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Database Connection Function
Dbconnection();

// Configure and set up session middleware
const setupSessionMiddleware = async () => {
  const mongoClient = await Dbconnection();

  app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback_secret_key', // Ensure a secret is always provided
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      client: mongoClient, // Use the MongoDB client directly
      dbName: new URL(process.env.MONGODB_URI).pathname.substring(1), // Extract database name from URI
      collectionName: 'sessions'
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 2, // 2 hours
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      httpOnly: true, // Prevents client-side JS from accessing the cookie
      sameSite: 'strict' // Added for additional security
    }
  }));

  // Routes
  app.use("/api/auth", userRouter);
  app.use("/api/user", protectedRoutes);

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      message: 'Something went wrong!'
    });
  });

  return app;
};

// Port configuration
const PORT = process.env.PORT || 4001;

// Start server
const startServer = async () => {
  try {
    const app = await setupSessionMiddleware();

    const server = app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      // Gracefully shut down the server
      server.close(() => process.exit(1));
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      console.error('Uncaught Exception:', error);
      // Gracefully shut down the server
      server.close(() => process.exit(1));
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Initialize the server
startServer();

export default app;