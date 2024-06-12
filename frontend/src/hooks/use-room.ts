import { Room } from "@/utils/types"
import axios from "axios"
import { useEffect, useState } from "react"

export const useRoom = (_roomId: string | undefined, groupId: string | undefined) => {
    const [room] = useState<Room>()
    const [rooms, setRooms] = useState<Array<Room>>()

    useEffect(() => {
        getRoom()
        getRooms()
    }, [groupId, roomId])

    const getRoom = async () => {
        const {data} = await axios.get(`room/${roomId}`)
        setRoom(data)
    }

    const getRooms = async () => {
        const {data} = await axios.get(`room/group/${groupId}`)
        setRooms(data)
    }

    const createRoom = async (name: string, permissions: Array<string>) => {
        const {data} = await axios.post(`room/create`, {
            name,
            permissions,
            groupId
        })
        if(!data) return
        setRooms((prevRooms) => (prevRooms ? [...prevRooms, data] : [data]))
    }

    return {
        room,
        rooms,
        createRoom
    }
}