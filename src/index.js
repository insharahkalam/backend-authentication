import dns from 'dns'
dns.setServers(['8.8.8.8', '1.1.1.1'])

import express from 'express'
import dotenv from 'dotenv'
import ConnectDB from './db/db.js'
import router from './routes/auth.routes.js'
dotenv.config()



const app = express()

app.use(express.json())
ConnectDB()


app.use('/api/auth', router)


app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT} port`);
})