import express from "express"
import { JWT_SECRET } from "@repo/backend-common/config"

const app = express()

app.get("/", (req, res) => {
    res.status(200).json("This is the server")
})

app.listen(3004, () => {
    console.log("server is running on 3004", JWT_SECRET)
})