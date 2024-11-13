

const userLogoutController = async (req,res)=>{

    try {
        res.clearCookie("token")

        res.json({
            message:"logout Successfully",
            error:false,
            success:true,
            data:[]
        })
    } catch (error) {
        res.status(400).send({
            message: error.message,
            error:true,
            success:false
        })
    }
}


export default userLogoutController