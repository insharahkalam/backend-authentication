import express from "express";
import { createUser } from "../controllers/auth.controller.js";

const router = express.Router()

router.post('/users', createUser);
router.get('/allUsers')

export default router