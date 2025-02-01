import jwt from 'jsonwebtoken'


const authUser = async (req,res,next)=>{
    
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.json({ success: false, message: "not user" });
        }if (token.length>24) {
            const tokenDE = jwt.verify(token, process.env.JWT_SEC);
            req.body.userId = tokenDE.id;
        } else {
            const tokenDE = { id: token };
            req.body.userId = tokenDE.id;
        }
        console.log("authenticating.... ..\x1b[36m ",req.body.userId,"\x1b[0m")
        next();
        } catch (error) {
            console.error(error);
            res.json({ success: false, message: error.message });
        }
};

export default authUser