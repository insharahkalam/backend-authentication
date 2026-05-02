import userSchema from "../models/auth.model.js";
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields required."
            })
        }
        if (username.length < 4) {
            return res.status(400).json({
                message: "username must be grater than 4 letters."
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
                message: "password must be grater than 6 characters."
            })
        }

        const emailExists = await userSchema.findOne({ email })
        if (emailExists) {
            return res.status(400).json({
                message: "Already exists."
            })
        }
        const user = await userSchema.create({
            username,
            email,
            password
        })
        res.status(200).json({
            message: "user created sucessfully!",
            user
        })

    } catch (error) {
        console.log("error in creating users.=====>", error);
    }

}

const getUser = async (req, res) => {
    const allUser = await userSchema.find()
    res.json({
        message: "user fetched success!",
        allUser
    })
}

const getOneUser = async (req, res) => {
    const { id } = req.params
    console.log(id);

    const specific = await userSchema.findById({ _id: id })
    if (specific == null) {
        return res.json({
            message: "user not found!",
        })
    }
    res.json({
        message: "user fetched!",
        specific
    })
}

// const loginUser = async (req, res) => {
//     const { email, password } = req.body
//     if (!email || !password) {
//         return res.json({
//             message: "All feild requird!"
//         })
//     }

//     const logUser = await userSchema.findOne({ email })
//     console.log(logUser);

//     if (logUser == null) {
//         return res.json({
//             message: "user not found!"
//         })
//     }
//     if (logUser.password != password) {
//         console.log(logUser.password);
//         console.log(password);

//         return res.json({
//             message: "Invalid credentials!"
//         })
//     }

//     const token = jwt.sign({ id: logUser.id }, process.env.JWT_SECRETS)
// }

// if (!token) {
//     return res.json({
//         message: "Unautherized!"
//     })
// }

// if (token) {
//     const decoded = jwt.verify(token, process.env.JWT_SECRETS)
//     if (decoded.id !== logUser.id) {
//         return res.json({
//             message: "Invalid token!"
//         })
//     }
// }

// const cookies = (req, res) => {
//     req.cookies('token', token)
// }

// res.json({
//     message: "login success",
//     token,
//     cookies

// })




export { createUser, getUser, getOneUser }