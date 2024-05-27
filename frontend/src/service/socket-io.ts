
/*export const createSocketWithHandlers = (): Socket => {
    const token = getData('accessToken') || ""
    console.log(`Trying to connect to websocket with token ${getData('accessToken')}`)
    const socket = io(socketIOUrl, {
        extraHeaders: {
            Authorization: `${token}`
        },
        auth: {
            Authorization: `${token}`
        },
        transports: ['websocket', 'polling']
    })
    console.log(socket)

    socket.connect()

    console.log(socket)

    socket.on('connect', () => {
        console.log(`Connected to socket ${socket.id}`)
    })

    socket.on('connect_error', (error) => {
        console.error('Connection error:', error)
    })

    socket.on('disconnect', (reason) => {
        console.log('Disconnected:', reason)
    })

    

    return socket
}*/