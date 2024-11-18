import userModel from "../../models/userModel.js"
import bcrypt  from "bcryptjs"
import jwt from "jsonwebtoken"

const signInController = async (req,res)=>{
     try{
        const { email, password } = req.body;
    
        // Validate input
        if (!email) {
          throw new Error("Please provide an email.");
        }
        if (!password) {
          throw new Error("Please provide a password.");
        }
    
        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
          throw new Error("User not found.");
        }
    
        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password.");
        }
    
        // Generate token
        const tokenData = {
          _id: user._id,
          email: user.email,
        };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
          expiresIn: "8h", // Token expiration time
        });
    
        // Send response with token
        res.status(200).send({
          message: "Login successful",
          data:  token , // Send token to the client
          success: true,
          error: false,
        });
     } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message || error
        })
     }

}

export default signInController
