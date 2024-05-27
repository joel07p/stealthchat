export type AddMessage = {
    message: string;
    username: string;
    roomId: string;
    attachment: any;
};
export type DeleteMessage = {
    messageId: string;
    roomId: string;
};
