import { getData } from "@/service/storage"
import { useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"

export const socketUrl = `http://127.0.0.1:3300/messages`

export const useSocket = (roomId: string | undefined, groupId: string | undefined) => {  
    const [socket, setSocket] = useState<Socket>()

    useEffect(() => {
        createSocket()
        console.log(groupId)
        socket?.connect()
    }, [roomId, groupId])

    const createSocket = (): Socket => {
        const accessToken = getData('accessToken') || ""
        console.log(`${socketUrl}?roomId=${roomId}`)
        console.log(`Trying to connect to websocket with token ${getData('accessToken')}`)
        const socket = io(`${socketUrl}?roomId=${roomId}&groupId=${groupId}`, {
            extraHeaders: {
                Authorization: `${groupId}`,
                groupid: `${groupId}` || "",
                groupId: groupId || ""
            },
            auth: {
                Authorization: `${accessToken}`,
            },
            transports: ['websocket', 'polling']
        })
    
        console.log(socket)
    
        socket.on('connect', () => {
            console.log(`Connected to socket ${socket.id}`)
        })

        socket.on('add_message_update', (data) => {
            console.log(data)
        })

        setSocket(socket)
    
        return socket
    }

    return {
        socket,
    }
}