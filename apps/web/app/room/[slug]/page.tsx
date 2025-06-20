
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { ChatRoom } from "../../components/ChatRoom";


async function getRoomId(slug: string) {
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`)
    console.log(response.data.room.id);

    return response.data.room.id;
}
export default async function Room({
    params
}: {
    params: {
        slug: string
    }
}) {
    console.log(await params);

    const slug = (await params).slug;
    console.log(slug);

    const roomId = await getRoomId(slug)
    console.log(roomId)

    return <ChatRoom id={roomId}></ChatRoom>
}