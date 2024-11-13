import userModel from "../../models/userModel.js"



const allUsers = async (req, res)=>{
   try {

     const allUsers = await userModel.find()

     res.status(200).send({
        message:"all users",
        data:allUsers,
        success:true,
        error:false
     })


   } catch (error) {
    res.status(500).send({
        message:error.message || error,
        error: true,
        success:false
    })
   }
}

export default allUsers