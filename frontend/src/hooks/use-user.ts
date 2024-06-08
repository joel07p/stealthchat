<<<<<<< HEAD
import axios from "axios"
import { useEffect, useState } from "react"

export const useUser = () => {
    const [userId, setUserId] = useState("")
    const [username, setUsername] = useState("")

    useEffect(() => {
        getBase()
    })
    
    const getBase = async () => {
        const {data} = await axios.get('user/current/base')
        setUserId(data.userId)
        setUsername(data.username)
    }

    const userOwnsMessage = (usernameFromMessage: string): boolean => {
        return username === usernameFromMessage
    }

    return {
        userId,
        username,
        userOwnsMessage
    }
=======

export const useUser = () => {
    
>>>>>>> 998973386d70ce879356b6b41b7df5a708a5217e
}