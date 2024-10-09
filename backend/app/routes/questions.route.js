import express from "express";
import {
  askQuestion,
  deleteQuestion,
  getQuestions,
  unvote,
  vote,
} from "../controllers/questions.controller.js";

const router = express.Router();

// for testing
router.get("/events/:event_id/question", getQuestions);

router.post("/events/:event_id/question", askQuestion);
router.delete("/question/:question_id", deleteQuestion);
router.post("/question/:question_id/vote", vote);
router.delete("/question/:question_id/vote", unvote);

export default router;
