import express from "express"
import { getMessage,sendMessage } from "../controllers/messagecontroller.js";// have to chnage the destination of this import
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/send/:id", protect, sendMessage);
router.get("/get/:id", protect, getMessage);

export default router;