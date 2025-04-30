import express from "express";
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import DbConnection from "./configs/Db.js";
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";

const app = express()

const port = process.env.PORT || 4000

await DbConnection()

const allowedOrigins =[`http://localhost:5173`]

// middleware

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get("/", (req, res)=>{
    res.json('api is working')
})

app.use('/api/user', userRouter)

app.listen(port, ()=> console.log(`server is running on port ${port}`))
