import cartModel from "../../models/cartProductModel.js"


const countAddToCartProduct = async (req,res)=>{
    try {
        const userId = req.userId

        const count = await cartModel.countDocuments({
            userId : userId
        })

        res.status(200).send({
            data:{
                count:count
            },
            message:"cart",
            error:false,
            success:true
        })
    } catch (error) {
        res.status(400).send({
            message:error?.message || error,
            success:false,
            error:true
        })
    }

}


export default countAddToCartProduct