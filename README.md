# 🎨 Draw Live

A real-time collaborative drawing and planning application inspired by Excalidraw.

## 🚀 Overview

Draw Live is a real-time collaborative web application that enables multiple users to draw, plan ideas, design system diagrams, and brainstorm together in a shared workspace. Users can securely sign up, create or join rooms using a unique room ID, and collaborate simultaneously on a synchronized canvas.

The application leverages **WebSockets** for low-latency, bidirectional communication and is structured as a **Turborepo-based monorepo** for efficient development and scalability.

---

## ✨ Features

- 🧑‍🤝‍🧑 Real-time multi-user collaboration with room-based sessions
- 🔐 Secure user authentication (login & signup)
- 🎨 Custom drawing tools (freehand pencil, shapes)
- 🔄 Live synchronization using WebSockets
- 🧠 Shared planning and brainstorming workspace
- 🌐 Modern and responsive UI
- ⚡ Monorepo setup powered by **Turborepo**

---

## 🛠️ Tech Stack

### Monorepo & Tooling

- **Turborepo**
- npm workspaces

### Frontend

- Next.js
- React

### Backend

- Node.js
- Express.js
- WebSockets (real-time communication)
- PostgreSQL
- Prisma ORM

---

## 🧩 Architecture & Data Flow

- Users authenticate via the Express backend.
- After authentication, clients establish a WebSocket connection.
- Drawing actions are emitted as real-time events.
- The server validates and broadcasts events to all users in the same room.
- Collaborative data is persisted in a PostgreSQL database using Prisma ORM.
- Turborepo manages builds, caching, and task execution across apps.

This architecture ensures **low-latency updates**, **consistent shared state**, and **efficient development workflows**.

---

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL
- npm or yarn

---

## 1️⃣ Clone the Repository

```bash
- git clone https://github.com/ajithpkumar18/draw-live.git
- cd draw-live
- npm install
- cd packages/db
- create a .env file
- Add the following details to the .env file
    PORT=5000
    WS_PORT=8080
    DATABASE_URL=postgresql://username:password@localhost:5432/draw_live
    JWT_SECRET=jwt_secret_key
- npx prisma generate
- npx prisma migrate dev
- From the root directory run : "npm run dev"

```
