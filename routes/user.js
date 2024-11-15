import express from "express";
import userSignUpController from "../controller/user/userSignup.js";
import signInController from "../controller/user/userSignin.js";
import userDetailsController from "../controller/user/userDetails.js"
import authToken from "../middleware/authToken.js";
import userLogoutController from "../controller/user/userLogout.js"
import allUsers from "../controller/user/allUsers.js"
import updateUserController from "../controller/user/updateUser.js"
import addTOCartController from "../controller/user/addToCartController.js";
import countAddToCartProduct from "../controller/user/countAddToCartProduct.js";
import addToCartViewProduct from "../controller/user/addToCartViewProduct.js";
import updateAddToCartProduct from "../controller/user/updateAddToCartProduct.js";
import deletAddTOCartProduct from "../controller/user/deleteAddToCartProduct.js";

const router =express.Router()

// users
router.post('/signup',userSignUpController)
router.post('/signin', signInController)
router.get('/user-details',authToken, userDetailsController)
router.get('/user-logout',authToken, userLogoutController)

//admin panel
router.get("/all-users", authToken, allUsers)
router.post("/update-user", authToken, updateUserController)


//user add to cart
router.post("/add-to-cart", authToken, addTOCartController)
router.get("/cart-count", authToken, countAddToCartProduct)
router.get('/view-cart', authToken, addToCartViewProduct)
router.post("/update-cart-product",authToken, updateAddToCartProduct)
router.post("/delete-cart", authToken,deletAddTOCartProduct)
export default router