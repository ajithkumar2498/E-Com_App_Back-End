import userModel from "../../models/userModel.js"
import bcrypt from "bcryptjs"


export const userSignUpController = async (req, res)=>{
    try {
        const {email, password, name} = req.body
    
        const user = await userModel.findOne({email})

        if(user){
            throw new Error("already email exist")
        }
        if(!email){
                throw new Error("Please Provide email")
        }
        if(!password){
            throw new Error("Please Provide password")
        } 
        if(!name){
        throw new Error("Please Provide name")
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error("someting is Wrong")
        }

        const payload = {
            ...req.body,
            role:"user",
            password:hashPassword
        }
        const userData  = new userModel(payload)
        const savedUser = await userData.save()
        res.status(201).send({
             data:savedUser,
             success:true,
             message:"User Created Successfully",
             error:false
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message || error
        })
    }
}

export default userSignUpController


