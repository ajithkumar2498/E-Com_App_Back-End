import userModel from "../../models/userModel.js"
import bcrypt  from "bcryptjs"
import jwt from "jsonwebtoken"

const signInController = async (req,res)=>{
     try {
         const {email, password} = req.body

         console.log(req.body)
         if(!email){
            throw new Error("Please Provide email")
             }
         if(!password){
            throw new Error("Please Provide password")
             }

      const user = await userModel.findOne({email})
      if(!user){
        throw new Error("User Not Found")
      }

     const checkpassword = await bcrypt.compare(password, user.password)
    

     if(checkpassword){
        const tokenData = {
            _id: user._id,
            email: user.email
        }
        const token = await jwt.sign( tokenData, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 8})
        const tokenOption ={
            httpOnly: true,
            secure:true
        }
        res.cookie("token",token, tokenOption).status(200).send({
            message:"Login Successfully",
            data: token,
            success:true,
            error:false
        })
     }else{
        throw new Error("please Check password")
     }

     } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message || error
        })
     }

}

export default signInController
