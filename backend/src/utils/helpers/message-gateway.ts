import { Logger } from "@nestjs/common";
import { log } from "console";
import { Namespace, Socket } from "socket.io";
import { SocketWithAuth } from "src/websocket";



export const addSocket = (client: Socket, roomToSocketsMap: Map<string, Set<string>>) => {
    const roomId = client.handshake.query.roomId?.toString()

    if(!roomId) return roomToSocketsMap

    if (!roomToSocketsMap.has(roomId)) {
        log(roomId)
        roomToSocketsMap.set(roomId, new Set());
    }
    
    roomToSocketsMap.get(roomId).add(client.id);

    log(`Room ${roomId} added to the map`)
    return roomToSocketsMap
}

export const removeSocket = (client: Socket, roomToSocketsMap: Map<string, Set<string>>) => {
    const roomId = client.handshake.query.roomId?.toString()

    if(!roomId) return roomToSocketsMap
    roomToSocketsMap.get(roomId).delete(client.id)

    return roomToSocketsMap
}

export const logConnectionChange = (io: Namespace, client: SocketWithAuth, logger: Logger) => {
    logger.debug(`Socket connected ${client}"`)
    logger.log(`WS Client with id: ${client.id} connected!`)
    logger.debug(`Number of connected sockets: ${io.sockets.size}`)
}

export const sendDataToSockets = (io: Namespace, roomToSocketsMap: Map<string, Set<string>>, roomId: string, data: any, eventName: string) => {
    const targetSockets = roomToSocketsMap.get(roomId)
    log("target socket" + targetSockets)
    targetSockets.forEach((socket: string) => {
        log(data)
        io.to(socket).emit(eventName, data)
    })
}