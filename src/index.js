import dns from 'dns'
dns.setServers(['8.8.8.8', '1.1.1.1'])

import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import ConnectDB from './db/db.js'
import router from './routes/auth.routes.js'
import cors from 'cors'
dotenv.config()

const app = express()

app.use(express.json())

const allowedOrigins = [
    "http://localhost:5173",
    "https://fronten-auth.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

// app.use(cors({
//     origin: ["http://localhost:5173/", "https://fronten-auth.vercel.app"],
//     credentials: true,
// }))

app.use(cookieParser())
ConnectDB()

app.get('/', (req, res) => {
    res.json({
        message: "server in running.."
    })
})

app.use('/api/auth', router)


app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT} port`);
})