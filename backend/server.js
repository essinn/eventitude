import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./app/routes/users.route.js";
import eventRoutes from "./app/routes/events.route.js";
import questionRoutes from "./app/routes/questions.route.js";
import attendeeRoutes from "./app/routes/attendees.route.js";

dotenv.config();
const app = express();

// Logging
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

// Server port
const PORT = process.env.PORT || 5000;

// Root endpoint
app.get("/", (req, res, next) => {
  res.json({ status: "Alive" });
});

app.use("/api", userRoutes);
app.use("/api", eventRoutes);
app.use("/api", attendeeRoutes);
app.use("/api", questionRoutes);

// Default response for any other request
app.use((req, res) => {
  res.sendStatus(404);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
