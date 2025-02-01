import assistantSchema from '../model/assistantModel.js'
import doctorModel from '../model/doctorModel.js';
import userModel from '../model/userModel.js';
import jwt from 'jsonwebtoken'
export const authMessages = async (req, res, next) => {
    console.log("authMessages ...")
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        
        if (!token) {
            console.log("Authentication token is missing")
          return res.status(401).json({ error: "Authentication token is missing" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SEC);
        if (!decoded){
            console.log("Authentication :error level 1")
            return res.json({success: false,message:"error message auth 1"})
        }
        const ass = await assistantSchema.findById(decoded.id)
        const dr = await userModel.findById(decoded.id)
        const us = await doctorModel.findById(decoded.id)
        if(!us&&!dr&&!ass){
            console.log("Authentication :error level 2")
            return res.json({success: false,message:"error message auth 2"})
        }
        req.user = { id: decoded.id };
        next();
      } catch (error) {
        console.log(error)
        return res.status(401).json({ error: "Invalid or expired token" });
      }
};