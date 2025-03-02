import express from "express";
import { authenticate} from "../middleware/authMiddleware.js"
import { leaderBoard } from "../controller/resultController.js";
const router = express.Router()

router.route("/").get(authenticate,leaderBoard)



export default router