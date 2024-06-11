// authMiddleware.js

import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

export const authenticateUser = (req, res, next) => {
  // Get the token from the request headers or cookies
  const token = req.headers.authorization || req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // Verify the token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // Attach the decoded user information to the request for further use
    req.user = decoded;
    next();
  });
};
