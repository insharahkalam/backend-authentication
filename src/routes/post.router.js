import express from 'express'
import { createPost, deletePost, getAllPost, getPost } from '../controllers/post.controller.js'
import multer from 'multer'
import { adminCheck } from '../middleware/authMiddleware.js'
import { userCheck } from '../middleware/postMiddleware.js'

const upload = multer({ storage: multer.memoryStorage() })

const postRouter = express.Router()

postRouter.post('/create', userCheck, upload.single("image"), createPost)
postRouter.delete('/delete/:id', deletePost)
postRouter.get('/getAllPost', adminCheck, getAllPost)
postRouter.get('/getPost/:id', userCheck, getPost)



export default postRouter