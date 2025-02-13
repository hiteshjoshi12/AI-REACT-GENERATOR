import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const protectedRoutes = express.Router();

protectedRoutes.get("/protected-data", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "This is protected data!",
    user: req.user,
  });
});

export default protectedRoutes;
