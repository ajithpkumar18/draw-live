import express, { Request, Response } from "express"
import { JWT_SECRET } from "@repo/backend-common/config"
import jwt from "jsonwebtoken"
import { CreateRoomSchema, CreateUserSchema } from "@repo/common/types"
import { prismaClient } from "@repo/db/db"

const app = express()

app.get("/", (req, res) => {
    res.status(200).json("This is the server")
})

app.get("/signin", (req, res) => {
    const userID = 1;
    const token = jwt.sign({ userID }, JWT_SECRET)
    res.status(200).json(token)
})

app.get("/signup", (req: Request, res: Response) => {

    const data = CreateUserSchema.safeParse(req.body)

    if (!data.success) {
        res.json({ message: "Incorrect inputs" })
        return
    }

    const newUser = prismaClient.user.create(req.body)
    res.status(200).json({ userID: "123" })
})

app.get("/room", (req, res) => {
    const data = CreateRoomSchema.safeParse(req.body);
    if (!data.success) {
        res.json({ message: "Incorrect Inputs" })
        return
    }

    res.status(200).json({ roomID: "123" })
})

app.listen(3004, () => {
    console.log("server is running on 3004", JWT_SECRET)
})