import express from "express";
import {
  addAttendee,
  getAttendee,
} from "../controllers/attendees.controller.js";

const router = express.Router();

router.get("/attendees", getAttendee);
router.post("/attendees", addAttendee);

export default router;
