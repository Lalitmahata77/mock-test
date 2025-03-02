import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/dbConnect.js";
import cookieParser from "cookie-parser";
import cors from "cors"
dotenv.config()
const app = express()

const PORT = process.env.PORT || 4000
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin: "*",
    credentials: true

}))
import userRoute from "./routes/userRoute.js"
import questionsRoute from "./routes/questionsRoute.js"
import resultRoute from "./routes/resultRoute.js"
import categoryRoute from "./routes/categoryRoute.js"
import leaderboardRoute from "./routes/leaderboardRoute.js"
app.use("/api/v2", userRoute)
app.use("/api/questions", questionsRoute)
app.use("/api/results", resultRoute)
app.use("/api/categories", categoryRoute)
app.use("/api/leaderboard", leaderboardRoute)
app.listen(PORT, ()=>{
    dbConnect()
    console.log(`server is running on port :${PORT}`);
    
})