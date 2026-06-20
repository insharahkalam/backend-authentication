import express from "express";
import { createUser, getUser, getOneUser, loginUser, admin, logOut, updateUser, deleteUser, forgotPass, resetPassword } from "../controllers/auth.controller.js";
import { adminCheck } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/users', createUser);
router.post('/loginUser', loginUser);
router.post('/forgot-password', forgotPass)
router.post("/reset-password", resetPassword);
router.get('/allUsers', getUser)
router.get('/getOne/:id', getOneUser)
router.get('/admin', adminCheck, admin)
router.get('/logout', logOut)
router.put('/updateUser/:id', updateUser)
router.delete('/deleteUser/:id', deleteUser)

export default router