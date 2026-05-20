import dns from 'dns'
dns.setServers(['8.8.8.8', '1.1.1.1'])

import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import ConnectDB from './db/db.js'
import router from './routes/auth.routes.js'
import cors from 'cors'
import postRouter from './routes/post.router.js'
dotenv.config()

const app = express()

app.use(express.json())

app.use(cors({
    origin: ['http://localhost:5173', "https://fronten-auth.vercel.app"],
    credentials: true
}))


// app.use(cors({
//    origin:'*',
// credentials:true
// }))

app.use(cookieParser())
ConnectDB()

app.get('/', (req, res) => {
    res.json({
        message: "server in running.."
    })
})

app.use('/api/auth', router)

app.use('/api/posts', postRouter)

if (process.env.deployment == 'false') {
    app.listen(process.env.PORT, () => {
        console.log(`server is running on ${process.env.PORT} port`);
    })

}
export default app




