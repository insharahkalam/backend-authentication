// import mongoose from "mongoose";

// const postSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     content: {
//         type: String,
//         required: true
//     },
//     image: {
//         type: String,
//         required: true
//     },
//     public_id: {
//         type: String
//     },


// })
// const post = mongoose.model('posts', postSchema)
// export default post


import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        category: {
            type: String,
            required: true,
        },

        brand: {
            type: String,
            required: true,
        },

        stock: {
            type: Number,
            default: 0,
            required: true,
        },

        image: {
            type: String,
            required: true,
        },

        public_id: {
            type: String,
        },

        discount: {
            type: Number,
            default: 0,
            required: true,
        },

        // rating: {
        //   type: Number,
        //   default: 0,
        // },

        featured: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

const product = mongoose.model("products", productSchema);
export default product