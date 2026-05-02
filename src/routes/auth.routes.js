import express from "express";
import { createUser, getUser, getOneUser } from "../controllers/auth.controller.js";

const router = express.Router()

router.post('/users', createUser);
// router.post('/login', loginUser);
router.get('/allUsers', getUser)
router.get('/getOne/:id', getOneUser)

export default router