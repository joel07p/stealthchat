export type AddMessage = {
    message: string;
    roomId: string;
    attachment: any;
};
export type DeleteMessage = {
    messageId: string;
    roomId: string;
};
