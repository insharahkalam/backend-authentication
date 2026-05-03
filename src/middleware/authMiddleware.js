import jwt from "jsonwebtoken";


const adminCheck = (req, res, next) => {
    const token = req.cookie.token
    console.log(token);

    if (!token) {
        return res.json({
            message: "Unautherized!"
        })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRETS)
    console.log(decoded);
    

}

export {adminCheck}