import express from "express"
import mongoose from "mongoose"
import cors from "cors"

import router from "./router/router.js"
import config from "./config.js"

const app = express()
const { URL, PORT } = config

app.use(express.json())
app.use(cors())

app.use('/api', router)

const start = async () => {
    try {
        await mongoose.connect(URL)
        app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()