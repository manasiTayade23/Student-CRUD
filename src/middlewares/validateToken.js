function validateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized. Token missing.",
    });
  }
  // If token exists, continue to the next middleware/route handler
  next();
}

module.exports = validateToken;
