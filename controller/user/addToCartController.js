import cartModel from "../../models/cartProductModel.js"


const addTOCartController = async (req,res)=>{
    try {
        const {productId} =req?.body
        const currentUser = req.userId

        const isProductAvailable = await cartModel.findOne({productId, userId:currentUser})

        if(isProductAvailable){
            res.json({
                message:"already exists in cart",
                success:false,
                error:true
            })
        }

        const payload = {
            productId:productId,
            userId:currentUser,
            quantity:1
        }

        const newAddToCart = new cartModel(payload)
        const saveCart = await newAddToCart.save()

        return res.status(200).send({
            data:saveCart,
            message:"product added to cart",
            success:true,
            error:false
        })


    } catch (error) {
        if(!res.headersSent){
            res.status(500).json({
                error: error?.message || error,
                success:false,
                error:true
            })
        }
        }
}


export default addTOCartController