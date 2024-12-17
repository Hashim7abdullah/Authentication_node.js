 //auth middleware

  // Middleware for session-based authentication
  // authMiddleware - using Authorization header instead of session token
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from 'Authorization' header
  
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
          id: decoded.id,
          role: decoded.role,
        };
        next();
      } catch (error) {
        return res.status(401).json({
          success: false,
          message: 'Authentication failed. Please log in again.',
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        message: 'No authentication token. Authorization denied.',
      });
    }
  };
  


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


 

  export {roleMiddleware , authMiddleware}