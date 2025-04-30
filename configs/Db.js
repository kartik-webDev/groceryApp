import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const DbConnection = async ()=>{
    try {
        mongoose.connect(`${process.env.DB_URL}/${process.env.Db_name}`)
        console.log("DB connected!!")
    } catch (error) {
        console.log("MogoDB connection Failed", error)
        process.exit(1)
    }
}

export default DbConnection;