import express, { Request, Response } from "express"
import { JWT_SECRET } from "@repo/backend-common/config"
import jwt from "jsonwebtoken"
import { CreateRoomSchema, CreateUserSchema, SigninSchema } from "@repo/common/types"
import { prismaClient } from "@repo/db/db"
import bcrypt from "bcrypt"
import { Middleware } from "./middleware.js"
import cors from "cors"
const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.status(200).json("This is the server")
})

app.post("/signin", async (req, res) => {

    const parsedData = SigninSchema.safeParse(req.body)

    if (!parsedData.success) {
        res.json({ message: "Incorrect inputs" })
        return;
    }

    try {
        const user = await prismaClient.user.findFirst({
            where: {
                email: parsedData.data.username
            }
        })

        if (!user) {
            res.status(403).json({
                message: "Not authorised"
            })
        }
        let result = await bcrypt.compare(parsedData.data.password, user?.password || "")
        if (result) {
            const token = jwt.sign({ userID: user?.id }, JWT_SECRET)
            res.status(200).json(token)
            return;
        }
        res.json({ message: "No user found" })
    }
    catch (err) {
        res.json({ message: err })
    }

    return;
})

app.post("/signup", async (req: Request, res: Response) => {

    const parsedData = CreateUserSchema.safeParse(req.body)
    console.log(parsedData);

    if (!parsedData.success) {
        res.json({ message: "Incorrect inputs" })
        return
    }

    try {

        const newUser = await prismaClient.user.create({
            data: {
                email: parsedData.data?.username,
                password: bcrypt.hashSync(parsedData.data?.password, 3),
                name: parsedData.data.name
            }
        })
        res.status(200).json(newUser)
        return
    } catch (err) {
        res.status(411).json({
            message: "User already exists with this username"
        })
        return
    }
})

app.post("/room", Middleware, async (req, res) => {
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({ message: "Incorrect Inputs" })
        return;
    }

    const userId = req.userID;

    if (!userId) {
        res.status(400).json({ message: "User ID is required" });
        return;
    }

    try {
        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId
            }
        });

        res.status(200).json({ roomID: room.id });
    } catch (err) {
        res.status(500).json({ message: "Error creating room", error: err });
    }

    return
})

app.get("/chats/:roomId", async (req, res) => {
    const roomId = Number(req.params.roomId);
    console.log(roomId);
    const messages = await prismaClient.chat.findMany({
        where: {
            roomId: roomId
        },
        orderBy: {
            id: "desc"
        },
        take: 50
    })
    res.json({
        messages
    })
    return;
})

app.get("/room/:slug", async (req, res) => {
    console.log("slug endpoint")
    const slug = req.params.slug;
    console.log(slug)
    const room = await prismaClient.room.findFirst({
        where: {
            slug: slug
        }
    })
    res.json({
        room
    })
    return;
})

app.listen(3004, () => {
    console.log("server is running on 3004", JWT_SECRET)
})