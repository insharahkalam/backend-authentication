import express from 'express'
import { createProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from '../controllers/product.controller.js'
import multer from 'multer'
import { adminCheck } from '../middleware/authMiddleware.js'
import { userCheck } from '../middleware/productMiddleware.js'

const upload = multer({ storage: multer.memoryStorage() })

const postRouter = express.Router()

postRouter.post('/create', adminCheck, upload.single("image"), createProduct)
postRouter.delete('/delete/:id', adminCheck, deleteProduct)
postRouter.get('/getAllProduct', getAllProduct)
postRouter.get('/getProduct/:id', getProduct)
postRouter.put('/update/:id', adminCheck, upload.single("image"), updateProduct)

export default postRouter