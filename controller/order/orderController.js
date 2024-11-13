import orderModel from "../../models/orderProductModel.js"



const orderController = async (req, res)=>{
    try {
        const currentUserId = req.userId 

        const orderList  = await orderModel.find({userId: currentUserId}).sort({createdAt : -1})

        res.status(200).send({
            data : orderList,
            message : " order list ",
            success : true,
            error : false
        })
    } catch (error) {
        res.status(500).send({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export default orderController