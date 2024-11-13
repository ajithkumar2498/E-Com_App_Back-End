import mongoose from "mongoose";


let productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:[true, "product name is required"]
    },
    BrandName:{
        type:String,
        required:[true, "brand name is required"]
    },
    Category:{
        type:String,
        required:[true, "category is required"]
    },
    description:{
        type:String,
        required:[true, "description is required"]
    },
    price:{
        type: Number,
        required:[true, "price is required"]
    },
    sellingPrice:{
        type: Number,
        required:[true, "selling price is required"]
    },
    productImage: [],
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const productModel = mongoose.model('Product', productSchema);
export default productModel;