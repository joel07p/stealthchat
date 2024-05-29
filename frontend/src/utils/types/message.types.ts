export type Message = {
    id: string
    message: string
    username: string
    sentAt: string
    roomId: string
}

export type AddMessage = {
    message: string
    roomId: string | undefined
    attachment: unknown
}