import express from "express";
import { sendContactEmail } from "../controllers/contactController.js";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/", sendContactEmail);

// View all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });
  }
});

export default router;