import userSchema from "../models/auth.model.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const createUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password || !role) {
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

        const hashPass = await bcrypt.hash(req.body.password, 10)
        console.log('password hashing====>', hashPass);


        const emailExists = await userSchema.findOne({ email })
        if (emailExists) {
            return res.status(400).json({
                message: "Already exists."
            })
        }
        const user = await userSchema.create({
            username,
            email,
            password: hashPass,
            role
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

const loginUser = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.json({
            message: "All feild requird!"
        })
    }
    const logUser = await userSchema.findOne({ email })
    console.log(logUser, "user mil rha hai.");

    if (logUser == null) {
        return res.json({
            message: "user not found!"
        })
    }

    const decode = await bcrypt.compare(password, logUser.password)
    console.log("logiin check=====>", decode);


    if (!decode) {
        return res.json({
            message: "Invalid credentials!"
        })
    }


    const token = jwt.sign({ id: logUser.id, role: logUser.role }, process.env.JWT_SECRETS)
    console.log("token mil rha hai check ====>", token);

    console.log("SECRET====>", process.env.JWT_SECRETS);

    res.cookie('token', token)

    res.json({
        message: "User login successful",
        token
    })


}

const admin = async (req, res) => {
    const allUser = await userSchema.find()
    res.json({
        message: "admin login success..",
        allUser
    })
}






export { createUser, getUser, getOneUser, loginUser, admin }