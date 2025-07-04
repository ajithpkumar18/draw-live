import axios from "axios";
import { BACKEND_URL } from "../config";
import { ChatRoomClient } from "./ChatRoomClient";

async function getChats(roomId: string) {
    console.log(roomId)
    const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
    return response.data.messages;
}

export async function ChatRoom({ id }: { id: string }): Promise<JSX.Element> {

    const messages = await getChats(id);
    return <ChatRoomClient messages={messages} id={id}></ChatRoomClient>
}