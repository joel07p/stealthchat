import { Group } from "@/pages/home-page"
import axios from "axios"
import { useEffect, useState } from "react"

export const useGroup = (groupId: string | undefined) => {
    const [groupID, setGroupID] = useState<string | undefined>()
    const [group, setGroup] = useState<Group>()

    useEffect(() => {
        if(groupId) setGroupID(groupId)
        getGroup()
        
    }, [groupId])

    const getGroup = async () => {
        const {data} = await axios.get(`group/${groupId}`)
        setGroup(data)
    }

    return {
        group
    }
}