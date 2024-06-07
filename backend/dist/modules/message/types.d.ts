export type AddMessage = {
    message: string;
    roomId: string;
    attachment: any;
};
export type UpdateMessageText = {
    messageId: string;
    roomId: string;
    messageText: string;
};
export type DeleteMessage = {
    messageId: string;
    roomId: string;
};
