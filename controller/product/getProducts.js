import productModel from "../../models/productModel.js"


const getProductsController = async(req, res)=>{
    try {
      const allProducts = await productModel.find().sort({createdAt: -1})  

      res.status(200).send({
        data:allProducts,
        success: true,
        error:false,
        message:"All Products"
      })
    } catch (error) {
        res.status(400).send({
            message: error.message || error,
            success:true,
            error:true
          })
    }
}

export default getProductsController