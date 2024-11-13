import express from "express";
import authToken from "../middleware/authToken.js";
import UploadProductController from "../controller/product/uploadProduct.js";
import getProductsController from "../controller/product/getProducts.js";
import updateProductController from "../controller/product/updateProduct.js";
import getCategoryController from "../controller/product/getCategoryProductSingle.js";
import getCategoryWiseProduct from "../controller/product/getCategoryWiseProduct.js";
import getProductDetails from "../controller/product/getProductDetails.js";
import searchProduct from "../controller/product/searchProduct.js";
import filterProducts from "../controller/product/filterProduct.js";


const router =express.Router()

// product
router.post("/upload-product", authToken, UploadProductController)
router.get("/all-products", getProductsController )
router.post("/update-product", authToken, updateProductController )
router.get("/get-categoryProduct", getCategoryController)
router.post("/category-products", getCategoryWiseProduct)
router.post("/product-details", getProductDetails)
router.get("/search", searchProduct)
router.post("/filter-products", filterProducts)

export default router