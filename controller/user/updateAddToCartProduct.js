import cartModel from "../../models/cartProductModel.js"


const updateAddToCartProduct = async (req,res)=>{
    try {
        
        const currentUserId = req.userId
        const addTOCartProductId = req?.body?._id
        const qty = req.body.quantity

        const updateProduct = await cartModel.updateOne({_id: addTOCartProductId},{
           ...(qty && {quantity:qty})
        })

        res.status(200).send({
            message:"updated product quantity",
            data:updateProduct,
            error:false,
            success:true
        })
    } catch (error) {
        res.status(400).send({
            messga:error?.message || error,
            success:false,
            error:false
        })
    }
}

export default updateAddToCartProduct