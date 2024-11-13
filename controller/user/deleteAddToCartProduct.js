import cartModel from "../../models/cartProductModel.js"


const deletAddTOCartProduct = async(req,res)=>{
    try {
        
        const currenUserId = req.userId
        const addTOCartProduct = req.body._id

        const deleteProduct = await cartModel.deleteOne({_id:addTOCartProduct})

        res.status(200).send({
            message:"product deleted from cart",
            data:deleteProduct,
            success:true,
            error:false
        })

    } catch (error) {
        res.status(400).send({
            message: error?.message|| error
        })
    }
}


export default deletAddTOCartProduct