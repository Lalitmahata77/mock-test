import mongoose from "mongoose";
const resultSchema = new mongoose.Schema({
  // Reference to the user (if you have authentication)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to your User model
    required: true
  },
  // Test category (e.g., "Science", "Math")
  category: {
    type: String,
    required: true
  },
  // Score details
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  // Time taken in seconds
  timeTaken: {
    type: Number,
    required: true
  },
  // Detailed breakdown of answers
  answers: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    },
    userAnswer: String,
    correctAnswer: String,
    isCorrect: Boolean
  }],
  // Automatically track timestamps
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add indexes for faster querying
resultSchema.index({ userId: 1, category: 1 });

// Virtual field for percentage score
resultSchema.virtual('percentage').get(function() {
  return ((this.score / this.totalQuestions) * 100).toFixed(2);
});

 const Result = mongoose.model("Result",resultSchema)
  export default Result