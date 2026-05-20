import jwt from "jsonwebtoken";
import userSchema from "../models/auth.model.js";

const userCheck = async (req, res, next) => {
    try {
        const token = req.cookies.token
        console.log(token, "token mil rha hai.");

        if (!token) {
            return res.json({
                message: "Unautherized! please login first then create a post..!"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRETS)

        console.log(decoded, "decoded check");

        req.user = decoded

        next()

    } catch (error) {
        console.log(error, "error in usercheck middleware.");

        res.json({
            message: "Invalid Token"
        })
    }

}

export { userCheck }