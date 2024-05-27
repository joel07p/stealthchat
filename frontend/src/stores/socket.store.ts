import { Socket } from "socket.io-client";
import { create } from "zustand";

type SocketStore = {
    socket: Socket | null
}

export const useSocketStore = create<SocketStore>(() => ({
    socket: null,
}))