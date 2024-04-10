import { handleRequestError } from "@/utils/helpers/handle-request-error"
import { CreateGroupData, JoinGroupData, LeaveGroupData } from "@/utils/types/group.types"
import axios, { AxiosResponse } from "axios"

export const getGroups = async () => {
    try {
        const groups: AxiosResponse = await axios.get(`group`)

        const { data } = groups

        return data
    } catch(error) {
        handleRequestError(error)
        return
    }
}

export const createGroup = async (groupData: CreateGroupData) => {
    try {
        const response: AxiosResponse = await axios.post('group', groupData)

        const { data } = response

        return data
    } catch(error) {
        handleRequestError(error)
        return
    }
}

export const leaveGroup = async (leaveGroupData: LeaveGroupData) => {
    try {
        const response: AxiosResponse = await axios.patch('group', leaveGroupData)

        const { data } = response

        return data
    } catch(error) {
        handleRequestError(error)
        return
    }
}

export const joinGroup = async (joinGroupData: JoinGroupData) => {
    try {
        const response: AxiosResponse = await axios.post('group/join', joinGroupData)

        const { data } = response

        return data
    } catch(error) {
        handleRequestError(error)
        return
    }
}