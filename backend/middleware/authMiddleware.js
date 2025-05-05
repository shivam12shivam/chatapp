// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/usermodel.js';

export const protect =async  (req, res, next) => {
  console.log("Protect middleware reached");  // Add this to confirm if middleware is called
  const token = req.cookies.jwt;
  
  console.log("token:- ", token);
  console.log("envtoken:- ", process.env.jwt_token);
  
  if (!token) {
    console.log("looking for token");
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwt_token);
    const user = await User.findById(decoded._id).select('-password');
    console.log("inside protected function");
    console.log(decoded);
    if (!user) {
      console.log("user not found");
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log("Invalid token");
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
