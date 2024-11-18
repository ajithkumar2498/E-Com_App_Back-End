import jwt from "jsonwebtoken"

const userLogoutController = async (req,res)=>{

    try {
       // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
    
   if (!token) {
      return res.status(400).json({
        message: "No token provided. Please log in.",
        error: true,
        success: false,
      });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log("Token verification failed:", err);
        return res.status(403).json({
          message: "Invalid or expired token.",
          error: true,
          success: false,
        });
      }

      // If token is valid, proceed with logout logic
      // Here, you can remove any server-side session or do other cleanup

      res.json({
        message: "Logged out successfully.",
        error: false,
        success: true,
        data: [],
      });
    });
    
      } catch (error) {
        res.status(400).json({
          message: error.message,
          error: true,
          success: false,
        });
      }
}


export default userLogoutController