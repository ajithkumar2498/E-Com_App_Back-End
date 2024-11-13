import productModel from "../../models/productModel.js"



const getProductDetails = async (req,res)=>{
    try {
         

        const {productId} = req.body

        const product = await productModel.findById(productId)

        res.status(200).send({
            data:product,
            message:"product",
            success:true,
            error:false
        })
    } catch (error) {
        res.status(400).send({
            message: error?.message || error,
            success:true,
            error:true
          })
    }
}

export default getProductDetails