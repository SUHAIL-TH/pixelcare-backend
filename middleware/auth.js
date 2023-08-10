// authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      auth: false,
      status: "failed",
      message: "No token provided",
    });
  }

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({
        auth: false,
        status: "failed",
        message: "Failed to authenticate",
      });
    } else {
      req.userId = decoded._id; // Add userId to request object
      next(); // Proceed to the next middleware/route
    }
  });
};

module.exports = authMiddleware;
