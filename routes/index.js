import express from 'express'
import userRoutes from './user.js'
import productRoutes from "./products.js"
import paymentRoutes from "./payments.js"


const router = express.Router()

router.use('/users',userRoutes)
router.use('/products',productRoutes)
router.use('/payments', paymentRoutes)

export default router