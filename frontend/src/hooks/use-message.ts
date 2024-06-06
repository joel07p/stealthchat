import { AddMessage, DeleteMessage, Message } from "@/utils/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

export const useMessage = (socket: Socket | undefined, roomId: string | undefined) => {
    const [messages, setMessages] = useState<Array<Message>>([])

    useEffect(() => {
        if (!socket) return
        getMessages()

        const handleNewMessage = (message: Message) => {
            setMessages((prevMessages) => [...prevMessages, message])
        };

        socket.on('add_message_update', handleNewMessage)

        return () => {
            socket.off('add_message_update', handleNewMessage)
        }
    }, [socket])

    const getMessages = async () => {
        const {data} = await axios.get(`message/${roomId}`)
        console.log(data)
        setMessages(data.sort((a: Message, b: Message) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()))
    } 


    const addMessage = async (data: AddMessage) => {
        socket?.emit('add_message', data)
    }

    socket?.on('add_messsage_update', (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message])
    })

    const deleteMessage = async (deletedMessage: DeleteMessage) => {
        socket?.emit('delete_message', deletedMessage)
    }
    const handleDeleteMessage = (deletedMessage: Message) => {
        setMessages((prevMessages) => prevMessages.filter(message => message.id !== deletedMessage.id));
    };
    socket?.on('delete_message_update', handleDeleteMessage);


    return {
        messages,
        addMessage,
        deleteMessage
    }
}