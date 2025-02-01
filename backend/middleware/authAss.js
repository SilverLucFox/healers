import jwt from 'jsonwebtoken'

const authAss = async (req,res,next)=>{
    
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.json();

        }
        const asstoken = jwt.verify(token, process.env.JWT_SEC);
        req.body.assId=asstoken.id
        next();
        } catch (error) {
            console.error(error);
            res.json({ success: false, message: error.message });
        }
};

export default authAss