import { useEffect, useState } from "react";
import { WS_URL } from "../config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>()
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI0NTY1MTU4NS1lNDdlLTQ1YjEtYjY0ZS1iMTc2M2Y3NzI0MWIiLCJpYXQiOjE3NTAwODU1NDZ9.UaFJVAWS4FwEQRA6O-SwkdM4ESpv4QLgr726djcLIB0'

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=${token}`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, [])

    return { socket, loading };
}