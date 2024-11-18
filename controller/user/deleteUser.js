import userModel from "../../models/userModel.js"


const deleteUserController = async (req,res)=>{

    try {
        const {userId} = req.body

        if(!userId){
            throw new Error("User Id required")
        }

        const deleteduser = await userModel.findByIdAndDelete(userId)

        if(!deleteduser){
            return res.status(404).send({
                message: "user not found" || error,
                success:true,
                error:true
              })
        }

        res.status(200).send({
            success: true,
            message: "user deleted Successfully",
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

export default deleteUserController