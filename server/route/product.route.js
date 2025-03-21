import { Router } from 'express'
import auth from '../middleware/auth.js'
import { createProductController, getProductByCategory, getProductByCategoryAndSubCategory, getProductController, getProductDetails} from '../controllers/product.controller.js'


const productRouter = Router()

productRouter.post("/create",auth,createProductController)
productRouter.post('/get',getProductController)
productRouter.post("/get-product-by-category",getProductByCategory)
productRouter.post('/get-pruduct-by-category-and-subcategory',getProductByCategoryAndSubCategory)
productRouter.post('/get-product-details',getProductDetails)

// //update product
// productRouter.put('/update-product-details',auth,admin,updateProductDetails)

// //delete product
// productRouter.delete('/delete-product',auth,admin,deleteProductDetails)

// //search product 
// productRouter.post('/search-product',searchProduct)

export default productRouter