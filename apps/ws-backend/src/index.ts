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
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        console.log(decoded)
        if (typeof (decoded) == "string") {
            return null;
        }

        if (!decoded || !decoded.userID) {
            return null;
        }

        return decoded.userID;
    }
    catch (e) {
        return null;
    }
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
        let parsedData;
        if (typeof data !== "string") {
            parsedData = JSON.parse(data.toString())
        }
        else {
            parsedData = JSON.parse(data);
        }
        console.log("parsed data", parsedData);
        console.log("parsed data", parsedData.roomId);


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
            console.log("chat")
            try {

                await prismaClient.chat.create({
                    data: {
                        roomId,
                        message,
                        userId
                    }
                });
                console.log("users");

                users.forEach(user => {
                    const roomie = JSON.stringify(roomId)
                    console.log("message sent to", user.rooms.includes(roomie), user)
                    if (user.rooms.includes(roomie)) {
                        console.log("message not sent to", user)
                        user.ws.send(JSON.stringify({
                            type: "chat",
                            message: JSON.stringify(message),
                            roomId

                        }
                        ))
                    }
                })
            } catch (err) {
                console.log(err)
            }
        }
    })
})