import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    text: String,
    options: [String],
    correctAnswer: String, // Store the correct option (e.g., "A", "B")
    category: String, // e.g., "Math", "Science"
  });

  const Question = mongoose.model("Question",questionSchema)
  export default Question