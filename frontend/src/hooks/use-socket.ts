import { getData } from "@/service/storage"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Socket, io } from "socket.io-client"
import { useEncryption } from "./use-encryption"

export const socketUrl =  import.meta.env.VITE_SOCKET

export const useSocket = (roomId: string | undefined, groupId: string | undefined) => {  
    const [socket, setSocket] = useState<Socket>()
    const {publicKey, setServerPublicKey} = useEncryption()
    const navigate = useNavigate()

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
    
        if(!socket) navigate("/navigate")
    
        socket.on('connect', () => {
            console.log(`Connected to socket ${socket.id}`)
        })

        socket.on('server_public_key', (publicKey: string) => {
            console.log(publicKey)
            setServerPublicKey(publicKey)
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