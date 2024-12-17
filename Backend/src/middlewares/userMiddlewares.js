import jwt from "jsonwebtoken";

// Middleware for authentication and role-based authorization
const authMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    try {
      // Get token from cookies or Authorization header
      const token =
        req.cookies.token || req.header("Authorization")?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "No authentication token. Authorization denied.",
        });
      }

      // Verify and decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Role-based access control
      const role = decoded.role;

      // Check if the user's role is in the allowedRoles

      if (allowedRoles.includes(role)) {
        req.user = { id: decoded.id, role: decoded.role };
        return next();
      }

      // If the role doesn't match
      return res.status(403).json({
        success: false,
        message: "Access denied. You do not have the required role.",
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. Please log in again.",
      });
    }
  };
};

export default authMiddleware;
