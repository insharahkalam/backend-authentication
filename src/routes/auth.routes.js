import express from "express";
import { createUser, getUser, getOneUser, loginUser, admin, logOut, updateUser, deleteUser } from "../controllers/auth.controller.js";
import { adminCheck } from "../middleware/authMiddleware.js";
import { updateCheck } from "../middleware/updateMiddleware.js";

const router = express.Router()

router.post('/users', createUser);
router.post('/login', loginUser);
router.get('/allUsers', getUser)
router.get('/getOne/:id', getOneUser)
router.get('/admin', adminCheck, admin)
router.get('/logout', logOut)
router.put('/updateUser/:id', updateCheck, updateUser)
router.delete('/deleteUser/:id', deleteUser)

export default router