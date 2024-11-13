import cartModel from "../../models/cartProductModel.js"



const addToCartViewProduct = async (req,res)=>{
    try {

        const currentUser = req.userId

        const allProduct = await cartModel.find({
            userId: currentUser
        }).populate("productId")

        res.status(200).send({
            message:"fetched",
            data:allProduct,
            success:true,
            error:false
        })
        
    } catch (error) {
        res.status(400).send({
            message:error?.message || error,
            success:false,
            error:true
        })
    }
}

export default addToCartViewProduct