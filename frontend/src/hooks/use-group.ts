import { Group } from "@/pages/home-page"
import axios from "axios"
import { useEffect, useState } from "react"

export const useGroup = (groupId: string | undefined) => {
    const [group, setGroup] = useState<Group>()
    const [groups, setGroups] = useState<Array<Group>>()

    useEffect(() => {
<<<<<<< HEAD
        getGroup(),
        getGroups()
=======
        getGroup()
        
>>>>>>> 998973386d70ce879356b6b41b7df5a708a5217e
    }, [groupId])

    const getGroup = async () => {
        const {data} = await axios.get(`group/${groupId}`)
        setGroup(data)
    }

    const getGroups = async () => {
        const {data} = await axios.get(`group`)
        setGroups(data)
    }

    return {
        group,
        groups
    }
}