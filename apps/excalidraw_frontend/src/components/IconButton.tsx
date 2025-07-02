import { ReactNode } from "react";

export default function IconButton({ icon, onClick, activated }: { icon: ReactNode, onClick: () => void, activated: boolean }) {
    return <div className={`pointer rounded-full border p-2 ${activated ? "text-red-800" : "text-white"}`} onClick={onClick}>
        {icon}
    </div>
}
