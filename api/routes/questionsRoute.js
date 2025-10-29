import express from "express";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js"
import {createQuestions, deleteQuestions, getQuestionById, getQuestions, updateQuestions } from "../controller/questionsController.js";
const router = express.Router()
router.route("/").post(authenticate,authorizeAdmin,createQuestions)
.get(authenticate,getQuestions)
router.route("/:id").get(authenticate,getQuestionById)
router.route("/:id")
.delete(authenticate, authorizeAdmin, deleteQuestions)
  .put(authenticate, authorizeAdmin, updateQuestions);

export default router