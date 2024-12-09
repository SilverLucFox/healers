import jwt from 'jsonwebtoken'

//addmin feyet sah

const authAdimin = async (req,res,next)=>{
    
    try {
        const atoken = req.headers.authorization && req.headers.authorization.split(" ")[1];
        if (!atoken) {
          return res.json({ success: false, message: "not admin" });
        }
    
        const tokenDE = jwt.verify(atoken, process.env.JWT_SEC);
        if (tokenDE !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORLD) {
          return res.json({ success: false, message: "not admin" });
        }
    
        next();
      } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
      }
    };

export default authAdimin