import UploadProductPermission from "../../helpers/permission.js"
import productModel from "../../models/productModel.js"


const updateProductController = async (req, res)=>{
    try {
        if(!UploadProductPermission(req.userId)){
            throw new Error("Permission Denied")   
        }
            
        const {_id, ...resBody} = req.body

        const updateProduct = await productModel.findByIdAndUpdate(_id,resBody)
       
        res.status(200).send({
            message:"product Updated Successfully",
            error:false,
            success:true,
            data: updateProduct
        })
    } catch (error) {
        res.status(400).send({
            message: error.message || error,
            success:true,
            error:true
          })


    }
}


export default updateProductController