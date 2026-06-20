import mongoose from "mongoose";

const authSchema = mongoose.Schema({
    username: {
        required: true,
        type: String,
        minLength: 4
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    resetToken: {
        type: String,
        default: null
    },
    resetTokenExpire: {
        type: Date,
        default: null
    }

})

const userSchema = mongoose.model("users", authSchema)
export default userSchema;