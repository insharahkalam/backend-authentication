import userSchema from "../models/auth.model.js";

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

export { createUser ,getUser}