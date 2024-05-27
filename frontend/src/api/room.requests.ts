import { handleRequestError } from "@/utils/helpers/handle-request-error"
import axios from "axios"

export const getRoomsByGroupId = async (groupId: string | undefined) => {
    try {
        const {data} = await axios.get(`room/${groupId}`)
        return data
    } catch(error) {
        handleRequestError(error)
    }
}