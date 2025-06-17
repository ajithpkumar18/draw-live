import WebSocket, { WebSocketServer } from "ws";
import { JWT_SECRET } from "@repo/backend-common/config"
import jwt, { decode, JwtPayload } from "jsonwebtoken"
import { prismaClient } from "@repo/db/db"

const wss = new WebSocketServer({ port: 8080 })

interface User {
    ws: WebSocket,
    rooms: string[],
    userId: string
}
const users: User[] = [];


function checkUser(token: string): string | null {
    const decoded = jwt.verify(token, JWT_SECRET);

    console.log(decoded)
    if (typeof (decoded) == "string") {
        console.log(typeof (decoded), "decoded")
        return null;
    }

    if (!decoded || !decoded.userID) {
        console.log("!decoded")
        return null;
    }

    return decoded.userID;
}

wss.on("connection", (ws, request) => {

    const url = request.url;
    console.log(url);

    if (!url) {
        return
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || "";
    console.log(token)
    const userId = checkUser(token);

    console.log(userId);
    if (userId == null) {
        ws.close();
        return null;
    }

    users.push({
        userId,
        rooms: [],
        ws
    })

    ws.on("message", async function message(data) {
        const parsedData = JSON.parse(data as unknown as string);

        if (parsedData.type === "join_room") {
            const user = users.find(x => x.ws === ws);
            user?.rooms.push(parsedData.roomId)
        }

        if (parsedData.type === "leave_room") {
            const user = users.find(x => x.ws === ws)
            if (!user) {
                return;
            }
            user.rooms = user.rooms.filter(x => x === parsedData.room);
        }

        if (parsedData.type === "chat") {
            const roomId = parsedData.roomId;
            const message = parsedData.message;

            await prismaClient.chat.create({
                data: {
                    roomId,
                    message,
                    userId
                }
            });

            users.forEach(user => {
                if (user.rooms.includes(roomId)) {
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message: message,
                        roomId
                    }))
                }
            })
        }
    })
})