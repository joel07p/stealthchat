
export const setData = (key: string, data: string) => {
    sessionStorage.setItem(key, data) //encryptString(data)
    console.log("Tokens saved")
}

export const getData = (key: string) => {
    const data = sessionStorage.getItem(key)

    return data //
}

export const deleteData = (key: string) => {
    sessionStorage.removeItem(key)
}