import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOURI)
        console.log("database is connected successfully! ");

    } catch (error) {
        console.log('error in connecting database', error);
    }
}

export default ConnectDB