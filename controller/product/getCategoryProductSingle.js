import productModel from "../../models/productModel.js"



const getCategoryController = async (req, res)=>{
    try {

        const productCategory = await productModel.distinct("Category")

        //array to store product from each category    
        const productByCategory = []
        
        for(const Category of productCategory){
            const product =await productModel.findOne({Category})
            if(product){
                productByCategory.push(product)
            }
        }

        res.status(200).send({
            message:"Category products",
            success:true,
            error:false,
            data:productByCategory
        })
    } catch (error) {
        res.status(400).send({
            message: error.message || error,
            success:true,
            error:true
          })
    }
}


export default getCategoryController