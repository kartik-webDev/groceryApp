import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config()
import cookieParser from 'cookie-parser'

const authUser = async (req, res, next)=>{
    const {token} = req.cookies

    if(!token){
        return res.json({success: false, message: "Not Authorized"})
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if(tokenDecode.id){
            req.body.userId = tokenDecode.id
        }else{
            return res.json({success: false, message: "Not Authorized"})

        }

        next()

    } catch (error) {
        res.json({success: false, message: error.message});

    }
}

export default authUser


