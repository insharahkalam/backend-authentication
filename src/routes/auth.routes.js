import express from "express";
import { createUser, getUser, getOneUser, loginUser,admin } from "../controllers/auth.controller.js";
import { adminCheck } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/users', createUser);
router.post('/login', loginUser);
router.get('/allUsers', getUser)
router.get('/getOne/:id', getOneUser)
router.get('/admin', adminCheck, admin)

export default router