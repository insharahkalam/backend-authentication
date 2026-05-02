import express from "express";
import { createUser, getUser } from "../controllers/auth.controller.js";

const router = express.Router()

router.post('/users', createUser);
router.get('/allUsers', getUser)

export default router