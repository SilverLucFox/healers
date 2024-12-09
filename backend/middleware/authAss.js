import jwt from 'jsonwebtoken'

const authAss = async (req,res,next)=>{
    
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        console.log(token)
        if (!token) {
            return res.json({ success: false, message: "not assistant" });

        }
        const asstoken = jwt.verify(token, process.env.JWT_SEC);
        req.body.assId=asstoken.id
    
        console.log("authenticating...a. .s.\x1b[36m ",req.body.assId,"\x1b[0m")
        next();
        } catch (error) {
            console.error(error);
            res.json({ success: false, message: error.message });
        }
        };

export default authAss