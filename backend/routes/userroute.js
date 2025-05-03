import express from "express"
import { signup, signin, logout, alluser } from "../controllers/usercontroller.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/logout",protect, logout);
router.get("/all",protect,alluser);
router.get('/me', protect, async (req, res) => {
  try {
    res.status(200).json({
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


export default router;