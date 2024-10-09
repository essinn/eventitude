import express from "express";
import {
  createEvent,
  createEventById,
  deleteEvent,
  getEventById,
  searchEvent,
  updateEvent,
} from "../controllers/events.controller.js";

const router = express.Router();

router.post("/events", createEvent);
router.get("/events/:event_id", getEventById);
router.patch("/events/:event_id", updateEvent);
router.post("/events/:event_id", createEventById);
router.delete("/events/:event_id", deleteEvent);
router.get("/search", searchEvent);

export default router;
