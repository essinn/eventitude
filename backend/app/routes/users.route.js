import express from "express";
import {
  signup,
  login,
  getUsers,
  logout,
} from "../controllers/users.controller.js";

const router = express.Router();

// get for testing
router.get("/users", getUsers);

// create users
router.post("/users", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
