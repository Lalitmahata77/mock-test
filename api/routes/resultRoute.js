import express from "express";
import { authenticate} from "../middleware/authMiddleware.js"
import { getResults, saveResults } from "../controller/resultController.js";
const router = express.Router()

router.route("/").post(authenticate,saveResults)
.get(authenticate,getResults)


export default router