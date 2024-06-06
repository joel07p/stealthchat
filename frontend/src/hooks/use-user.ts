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
}