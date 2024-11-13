import userModel from "../models/userModel.js"


const UploadProductPermission = async(userId)=>{

    const user = await userModel.findById( userId);


    if(user.role !== 'ADMIN'){
        return false
    }

    return true

}

export default UploadProductPermission