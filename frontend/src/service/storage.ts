import { decryptString, encryptString } from "./encryption"

export const setData = (key: string, data: string) => {
    sessionStorage.setItem(key, encryptString(data))
}

export const getData = (key: string) => {
    const data = sessionStorage.getItem(key)

    return data ? decryptString(data) : ''
}

export const deleteData = (key: string) => {
    sessionStorage.removeItem(key)
}