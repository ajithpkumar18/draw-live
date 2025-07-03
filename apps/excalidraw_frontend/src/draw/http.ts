import axios from "axios";
import { HTTP_BACKEND } from "../../config";

export async function getExistingShapes(roomId: string) {
    const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
    const messages = res.data.messages;

    console.log(messages);

    const shapes = messages.map((x: { message: string }) => {
        const messageData = JSON.parse(x.message);
        console.log("shape", messageData.shape);
        return messageData.shape;
    })

    return shapes;
}