import jwt from "jsonwebtoken";
import userSchema from "../models/auth.model.js";

const updateCheck = async (req, res, next) => {
    try {

        const token = req.cookies.token
        console.log(token, "token hai.");

        if (!token) {
            return res.json({
                message: "Unautherized! Token not found."
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRETS)
        console.log(decoded, "for check ");

        const checkUser = await userSchema.findById(decoded.id)

        if (!checkUser) {
            return res.json({
                message: "User not found!"
            });
        }

        req.checkUser = checkUser

        next()

    } catch (error) {
        console.log(error, "error in auth middleware.");

        res.json({
            message: "Invalid Token"
        })
    }
}

export { updateCheck }