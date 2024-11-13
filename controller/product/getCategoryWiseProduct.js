import productModel from "../../models/productModel.js"


const getCategoryWiseProduct = async (req,res)=>{
    try {
        const Category = req.body.Category || req.query.Category;
         const products = await productModel.find({Category})
        
         res.status(200).send({
            message:"product category fetched",
            data: products,
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

export default getCategoryWiseProduct