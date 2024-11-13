import mongoose from "mongoose";


let userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    email:{
        type:String,
        unique:true,
        required:[true,'Email is required']
    },
    password:{
        type:String,
        required:[true,'Password is required'],
    },
    status:{
        type:Boolean,
        default:true
    },
    role:{
        type:String,
        default:'USER'
    },
    profilePic:String,
    createdAt:{
        type:Date,
        default:Date.now()
    }
},{
    collection:'users',
    versionKey:false
})

//create model
const userModel = mongoose.model('e-commerce',userSchema)

export default userModel