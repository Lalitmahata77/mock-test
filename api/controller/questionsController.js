import asyncHandler from "../middleware/asyncHandler.js";
import Question from "../models/paperSchema.js";

export const createQuestions = asyncHandler(async(req,res)=>{
    try {
        const newQuestion = new Question(req.body);
        await newQuestion.save();
        res.status(201).json(newQuestion);
      } catch (err) {
        res.status(400).json({ error: 'Invalid question data' });
      }
})

export const getQuestions = asyncHandler(async(req,res)=>{
    try {
        const questions = await Question.find();
        res.json(questions);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch questions' });
      }
})

export const getQuestionById = asyncHandler(async(req,res)=>{
    try {
        const questions = await Question.findById(req.params.id)
        if(questions){
            res.status(200).json(questions)
        }else{
            res.status(400).json({message: "Questions not found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch question' });     
    }
})

export const updateQuestions = asyncHandler(async(req,res)=>{
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        res.json(updatedQuestion);
      } catch (err) {
        res.status(404).json({ error: 'Question not found' });
      }
})

export const deleteQuestions = asyncHandler(async(req,res)=>{
    try {
        await Question.findByIdAndDelete(req.params.id);
        res.json({ message: 'Question deleted' });
      } catch (err) {
        res.status(404).json({ error: 'Question not found' });
      }
})

export const getQuestionsByCategory = asyncHandler(async(req,res)=>{
    try {
        const questions = await Question.find({ category: req.params.category }).limit(20);
        res.json(questions); // Each question will include _id
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch questions' });
      }
    
})

export const categories = asyncHandler(async(req,res)=>{
  try {
    const categories = await Question.distinct('category');
    console.log('Fetched categories:', categories); 
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
})