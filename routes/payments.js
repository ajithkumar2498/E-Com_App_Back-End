import express from "express";
import authToken from "../middleware/authToken.js";
import paymentController from "../controller/order/paymentController.js";
import webhooks from "../controller/order/webHook.js";
import orderController from "../controller/order/orderController.js";



const router =express.Router()

router.post('/checkout', authToken, paymentController)
router.post('/webhook',webhooks) //api/payments/webhook
router.get('/order-list', authToken, orderController)

export default router