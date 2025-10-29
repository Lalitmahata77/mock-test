import express from "express";
import { authenticate} from "../middleware/authMiddleware.js"
import { categories, getQuestionsByCategory } from "../controller/questionsController.js";
const router = express.Router()

router.route("/:category").get(authenticate,getQuestionsByCategory)
router.route("/").get(authenticate,categories)
export default router