import asyncHandler from "../middleware/asyncHandler.js";
import Result from "../models/resultModel.js";

export const saveResults = asyncHandler(async(req,res)=>{
    try {
        const result = new Result({
          ...req.body,
          userId: req.user._id, 
        });
        await result.save();
        res.status(201).json(result);
      } catch (err) {
        res.status(400).json({ error: 'Failed to save result' });
      }
})
export const getResults = asyncHandler(async(req,res)=>{
    try {
        const results = await Result.find({ userId: req.user._id });
        res.status(200).json(results);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch results" });
    }
})


export const leaderBoard = asyncHandler(async(req,res)=>{
  try {
    const { category } = req.query; // Optional category filter

    const leaderboard = await Result.aggregate([
      // Match results by category (if provided)
      ...(category ? [{ $match: { category } }] : []),
      
      // Group by user and calculate stats
      {
        $group: {
          _id: "$userId",
          totalScore: { $sum: "$score" },
          totalTests: { $sum: 1 },
          averageScore: { $avg: "$score" }
        }
      },
      
      // Join user details (name, email, etc.)
      {
        $lookup: {
          from: "users", // Collection name for User model
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      
      { $unwind: "$user" },
      
      // Sort by totalScore (descending)
      { $sort: { totalScore: -1 } },
      
      // Limit to top 20
      { $limit: 20 },
      
      // Project final fields
      {
        $project: {
          _id: 0,
          userId: "$_id",
          name: "$user.name",
          category: category || "Overall", // Use "Overall" if no category
          totalScore: 1,
          averageScore: { $round: ["$averageScore", 2] },
          totalTests: 1
        }
      }
    ]);

    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
})