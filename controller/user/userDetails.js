import userModel from "../../models/userModel.js"

export const userDetailsController = async (req,res)=>{
   try {
    const user = await userModel.findById(req.userId)

    res.status(200).send({
        message:"user data fetched successfully",
        data: user,
        success:true,
        error:false
    })
   } catch (error) {
      res.status(400).send({
        message: error.message || error,
        success:true,
        error:true
      })
   }
}

export default userDetailsController