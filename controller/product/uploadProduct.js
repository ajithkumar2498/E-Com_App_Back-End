import UploadProductPermission from "../../helpers/permission.js"
import productModel from "../../models/productModel.js"


const UploadProductController =async (req, res)=>{
   try {

     const sessionUserId = req.userId

     if(!UploadProductPermission(sessionUserId)){
         throw new Error("Permission Denied")   
     }

     const uploadProduct =await new productModel(req.body)
     const saveProduct = await uploadProduct.save()

     res.status(201).send({
        data:saveProduct,
        message:"product Uploaded Successfully",
        success:true, 
        error:false
     })
     
   } catch (error) {
    res.status(400).send({
        message: error.message,
        error:true,
        success:false
    })
   }
}

export default UploadProductController