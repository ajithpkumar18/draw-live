import Canvas from "@/components/Canvas";

export default async function CanvasPage({ params }: {
    params: {
        roomId: string
    }
}) {
    console.log(params)
    const roomId = (await params).roomId;
    return <Canvas roomId={roomId} />
}
