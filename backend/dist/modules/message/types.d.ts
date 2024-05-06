export type TAddMessage = {
    message: string;
    username: string;
    roomId: string;
    attachment: any;
    sentAt?: Date;
    room?: any;
};
