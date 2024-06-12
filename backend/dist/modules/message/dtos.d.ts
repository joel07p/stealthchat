export declare class AddMessageDTO {
    message: string;
    roomId: string;
    attachment: any;
}
export declare class UpdateMessageDTO {
    messageId: string;
    roomId: string;
    messageText: string;
}
export declare class DeleteMessageDTO {
    messageId: string;
    roomId: string;
}
