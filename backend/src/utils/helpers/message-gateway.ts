import { log } from "console";
import { Namespace, Socket } from "socket.io";

export const addSocket = (client: Socket, roomToSocketsMap: Map<string, Set<string>>) => {
    const roomId = client.handshake.query.roomId?.toString()

    if(!roomId) return roomToSocketsMap

    if (!roomToSocketsMap.has(roomId)) {
        log(roomId)
        roomToSocketsMap.set(roomId, new Set());
    }
    
    roomToSocketsMap.get(roomId).add(client.id);

    return roomToSocketsMap
}

export const sendDataToSockets = (io: Namespace, roomToSocketsMap: Map<string, Set<string>>, roomId: string, data: any, eventName: string) => {
    const targetSockets = roomToSocketsMap.get(roomId)
    log(targetSockets)
    targetSockets.forEach((socket: string) => {
        io.to(socket).emit(eventName, data)
    })
}