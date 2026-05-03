import express from "express";
import { createUser, getUser, getOneUser, loginUser } from "../controllers/auth.controller.js";
import { adminCheck } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/users', createUser);
router.post('/login', adminCheck, loginUser);
router.get('/allUsers', getUser)
router.get('/getOne/:id', getOneUser)

export default router