// import Stripe from "stripe"
import stripe from "../../config/stripe.js"
import cartModel from "../../models/cartProductModel.js";
import orderModel from "../../models/orderProductModel.js";

const endpointSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET_KEY


 const getLineItems = async(lineItems)=>{
  let ProductItems = []

  if(lineItems?.data?.length){
    for(const item of lineItems.data){
        const product = await stripe.products.retrieve(item.price.product)
        const productId = product.metadata.productId

        const productData = {
            productId: productId,
            name : product.name,
            price : item.price.unit_amount / 100,
            quantity :item.quantity,
            image : product.images
        }

        ProductItems.push(productData)

    }
  }

  return ProductItems
}

const webhooks = async (req, res)=>{
   
    const signature = req.headers['stripe-signature'];
    let event;

    const payloadString = JSON.stringify(req.body)

    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret : endpointSecret,
      });
      

    if(endpointSecret){
        try {
            event = stripe.webhooks.constructEvent(
                payloadString,
             header,
              endpointSecret
            );
          } catch (err) {
            console.log(`⚠️  Webhook signature verification failed.`, err.message);
            return response.sendStatus(400);
          }
    }
    
    // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
     
      const productDetails = await getLineItems(lineItems)
       
      const orderDetails = {
        productDetails : productDetails,
        email : session.customer_email,
        userId : session.metadata.userId,
        paymentDetails : {
            paymentId : session.payment_intent,
            payment_method_type : session.payment_method_types,
            payment_status : session.payment_status
           },
        shipping_options : session.shipping_options.map(s => {
            return  {
                ...s,
                shipping_amount : s.shipping_amount / 100}
            }),
        totalAmount : session.amount_total / 100

     }


    const order =  new orderModel(orderDetails)

    const saveOrder = await order.save()

    if(saveOrder?._id){
      const deleteCart = await cartModel.deleteMany({userId:session.metadata.userId})
    }

    break;

    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

    res.status(200).send()
}

export default webhooks