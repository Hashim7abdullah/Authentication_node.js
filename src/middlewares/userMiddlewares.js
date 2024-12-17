//role middleware

const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
      // First, use the existing authentication middleware
      authMiddleware(req, res, () => {
        // Check if user role is in the allowed roles
        if (!allowedRoles.includes(req.user.role)) {
          return res.status(403).json({
            success: false,
            message: 'Access denied. Insufficient permissions.'
          });
        }
        next();
      });
    };
  };


  //auth middleware

  // Middleware for session-based authentication
const authMiddleware = (req, res, next) => {
    // Check if session exists and has a token
    if (req.session && req.session.token) {
      try {
        // Verify the token
        const decoded = jwt.verify(req.session.token, process.env.JWT_SECRET);
        
        // Attach user information to the request
        req.user = {
          id: decoded.id,
          role: decoded.role
        };
        
        next();
      } catch (error) {
        // Token is invalid
        return res.status(401).json({
          success: false,
          message: "Authentication failed. Please log in again."
        });
      }
    } else {
      // No token in session
      return res.status(401).json({
        success: false,
        message: "No authentication token. Authorization denied."
      });
    }
  };

  export {roleMiddleware , authMiddleware}