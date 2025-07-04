"use client"

import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", width: "100vw" }}>
      <input value={roomId} onChange={(e) => { setRoomId(e.target.value) }} type="text" placeholder="Room id" />
      <button onClick={() => { router.push(`/room/${roomId}`) }}>Join Room</button>
    </div>
  );
}
