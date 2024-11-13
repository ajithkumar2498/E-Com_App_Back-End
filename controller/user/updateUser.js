import userModel from "../../models/userModel.js"



const updateUserController = async (req,res)=>{
    try {
        
        const sessionUser = req.userId

       const {userId, name, email, role} = req.body
       console.log(userId)

       const payload = {
        ...(email && {email : email}),
        ...(name && {name : name}),
        ...(role && {role : role}),
       }

       const user = await userModel.findById(sessionUser)
  
       
      console.log("user role",user.role)

       const updateUser = await userModel.findByIdAndUpdate(userId,payload)

     res.status(200).send({
        data: updateUser,
        message:"user role updated",
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

export default updateUserController