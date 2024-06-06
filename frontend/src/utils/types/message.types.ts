export type Message = {
    id: string
    message: string
    username: string
    sentAt: string
    roomId: string
    type: string
}

export type AddMessage = {
    message: string
    roomId: string | undefined
    attachment: unknown
}

export type DeleteMessage = {
    messageId: string
    roomId: string | undefined
}