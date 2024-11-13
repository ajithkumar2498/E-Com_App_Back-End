import mongoose from "mongoose";


let cartSchema = new mongoose.Schema({
    productId: {
      ref:"Product",
      type:String
    },
    quantity : Number,
    userId: String,
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const cartModel = mongoose.model('addToCart', cartSchema);
export default cartModel;