import jwt from "jsonwebtoken"

const authToken = async (req,res,next)=>{
    try {
        const authHeader = req?.headers?.authorization
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
          return res.status(401).send({
            message: "Authorization header missing or malformed",
            error: true,
            success: false,
          });
        }
    
        // Remove "Bearer " prefix to get the token
        const token = authHeader.split(" ")[1];
    
        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
            return res.status(403).json({
              message: "Token verification failed",
              error: true,
              success: false,
            });
          }
    
          // Attach the decoded user ID to the request object
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