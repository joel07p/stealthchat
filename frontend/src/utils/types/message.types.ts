export type Message = {
    id: string
    message: string
    username: string
    sentAt: Date
    roomId: string
}

export type AddMessage = {
    message: string
    username: string
    roomId: string | undefined
    attachment: unknown
}