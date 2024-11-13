import productModel from "../../models/productModel.js"

const filterProducts = async(req,res)=>{
    try {
         
        const categoryList = req?.body?.category

        const product = await productModel.find({
           Category : {
            "$in" : categoryList
           }
        })

        res.status(200).send({
            message:"category list fetched",
            data:product,
            error:false,
            success:false
        })

    } catch (error) {
        res.status(400).send({
            message: error?.message || error,
            success:true,
            error:false
        })
    }
}

export default filterProducts