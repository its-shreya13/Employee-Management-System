const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ message: "No token provided" }); 
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    req.user = decoded;

    
    next();
  } catch (error) {

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" }); 
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    
    return res.status(401).json({ message: "Unauthorized access" });
  }
};

module.exports = authMiddleware;
