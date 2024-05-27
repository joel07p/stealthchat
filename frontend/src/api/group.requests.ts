import { handleRequestError } from "@/utils/helpers/handle-request-error"
import axios from "axios"

export const getGroupById = async (groupId: string | undefined) => {
    try {
        const {data} = await axios.get(`group/${groupId}`)
        return data
    } catch(error) {
        handleRequestError(error)
    }
}