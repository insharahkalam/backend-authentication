import jwt from "jsonwebtoken";
import userSchema from "../models/auth.model.js";

const adminCheck = async (req, res, next) => {
    try {
        const token = req.cookies.token
        console.log(token, "token mil rha hai.");

        if (!token) {
            return res.json({
                message: "Unautherized!  check"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRETS)
        console.log(decoded.id, "id check ");
        console.log(decoded.role, "role check ");

        if (decoded.role != "admin") {
            return res.json({
                message: "Access denind , only admin can access this..!"
            })
        }

        next()

    } catch (error) {
        console.log(error, "error in auth middleware.");

        res.json({
            message: "Invalid Token"
        })
    }

}

export { adminCheck }