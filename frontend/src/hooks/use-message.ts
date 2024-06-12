import { AddMessage, DeleteMessage, Message, UpdateMessage } from "@/utils/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

export const useMessage = (socket: Socket | undefined, roomId: string | undefined) => {
    const [messages, setMessages] = useState<Array<Message>>([])

    useEffect(() => {
        if (!socket || !roomId) return;

        // Fetch initial messages
        const getMessages = async () => {
            try {
                const { data } = await axios.get(`message/${roomId}`);
                setMessages(data.sort((a: Message, b: Message) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()));
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        getMessages();

        // Define socket event handlers
        const handleNewMessage = (message: Message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        const handleUpdateMessage = (updatedMessage: Message) => {
            setMessages((prevMessages) =>
                prevMessages.map((message) =>
                    message.id === updatedMessage.id ? updatedMessage : message,
                    console.log("target")
                )
            )
        };

        const handleDeleteMessage = (deletedMessage: Message) => {
            setMessages((prevMessages) => prevMessages.filter(message => message.id !== deletedMessage.id));
        };

        // Register socket event handlers
        socket.on('add_message_update', handleNewMessage);
        socket.on('update_message_update', handleUpdateMessage);
        socket.on('delete_message_update', handleDeleteMessage);

        // Cleanup socket event handlers on unmount
        return () => {
            socket.off('add_message_update', handleNewMessage);
            socket.off('update_message_update', handleUpdateMessage);
            socket.off('delete_message_update', handleDeleteMessage);
        };
    }, [socket, roomId]);

    const addMessage = async (data: AddMessage) => {
        socket?.emit('add_message', data);
    };

    const updateMessage = async (updateMessageData: UpdateMessage) => {
        socket?.emit('update_message', updateMessageData);
    };

    const deleteMessage = async (deletedMessageData: DeleteMessage) => {
        socket?.emit('delete_message', deletedMessageData);
    };

    return {
        messages,
        addMessage,
        deleteMessage,
        updateMessage
    };
}