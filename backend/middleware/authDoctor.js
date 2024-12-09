import jwt from 'jsonwebtoken'

const authDoctor = async (req,res,next)=>{
    
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.json({ success: false, message: "not doctor" });
        }
        const tokenDE = jwt.verify(token, process.env.JWT_SEC);
        req.body.docId=tokenDE.id
    
        console.log("authenticating..d.. ..\x1b[36m ",req.body.docId,"\x1b[0m")
        next();
        } catch (error) {
            console.error(error);
            res.json({ success: false, message: error.message });
        }
        };

export default authDoctor