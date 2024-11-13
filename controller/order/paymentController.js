import stripe from "../../config/stripe.js";
import userModel from "../../models/userModel.js";

const paymentController = async (req, res)=>{
    try {
        const {cartItems} = req.body
        const user = await userModel.findOne({_id: req.userId})

        const params = {
              submit_type : 'pay',
              mode: 'payment',
              payment_method_types :['card'],
              billing_address_collection : 'auto',
              shipping_options : [
                {
                    shipping_rate: 'shr_1QHqgNLmNLwepXGiTxrJBfek'
                }
              ],
              customer_email : user.email,
              metadata : {
                userId : req.userId
              },
              line_items : cartItems.map((item,index)=> {
                 return {
                    price_data:{
                        currency : 'inr',
                        product_data : {
                           name : item.productId.productName,
                           images : [item.productId.productImage[0]],
                           metadata : {
                            productId : item.productId._id
                           }
                        },
                        unit_amount : item.productId.sellingPrice * 100
                    },
                    adjustable_quantity : {
                        enabled : true,
                        minimum : 1
                    },
                    quantity : item.quantity
                 }
              }),
              success_url : `${process.env.FRONTEND_URL}/success`,
              cancel_url : `${process.env.FRONTEND_URL}/cancel`

        }
        const session = await stripe.checkout.sessions.create(params)


        res.status(303).send(session)

    } catch (error) {
        res.status(400).send({
            message: error.message || error,
            success:true,
            error:true
          }) 
    }
}

export default paymentController