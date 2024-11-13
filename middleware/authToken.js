import jwt from "jsonwebtoken"

const authToken = async (req,res,next)=>{
    try {
        const token = req.cookies?.token
        // console.log("token    - ",token)
        if(!token){
            return res.status(200).send({
                message: "please Login...",
                error: true,
                success: false
            })
        }
           // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).json({
            message: "Token verification failed",
            error: true,
            success: false
          });
        }
  
        // Initialize req.user if it doesn't exist
        // req.user = req.user || {};
        req.userId = decoded?._id;
  
        // Proceed to the next middleware
        next();
      });


    } catch (error) {
        res.status(400).send({
            message:error.message || error,
            data:[],
            error:true,
            success:false
        })
    }
}

export default authToken