import { Room } from '@/utils/types'
import { create } from 'zustand'

type RoomStore = {
    rooms: Array<Room>
    setRooms: (rooms: Array<Room>) => void
}

export const useRoomStore = create<RoomStore>((set) => ({
    rooms: [],
    setRooms: (rooms: Array<Room>) => {
        set({rooms})
    } 
}))
