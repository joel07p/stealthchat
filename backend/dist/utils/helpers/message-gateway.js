"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDataToSockets = exports.logConnectionChange = exports.removeSocket = exports.addSocket = void 0;
const console_1 = require("console");
const addSocket = (client, roomToSocketsMap) => {
    const roomId = client.handshake.query.roomId?.toString();
    if (!roomId)
        return roomToSocketsMap;
    if (!roomToSocketsMap.has(roomId)) {
        (0, console_1.log)(roomId);
        roomToSocketsMap.set(roomId, new Set());
    }
    roomToSocketsMap.get(roomId).add(client.id);
    (0, console_1.log)(`Room ${roomId} added to the map`);
    return roomToSocketsMap;
};
exports.addSocket = addSocket;
const removeSocket = (client, roomToSocketsMap) => {
    const roomId = client.handshake.query.roomId?.toString();
    if (!roomId)
        return roomToSocketsMap;
    roomToSocketsMap.get(roomId).delete(client.id);
    (0, console_1.log)(roomToSocketsMap);
    return roomToSocketsMap;
};
exports.removeSocket = removeSocket;
const logConnectionChange = (io, client, logger) => {
    logger.debug(`Socket connected ${client}"`);
    logger.log(`WS Client with id: ${client.id} connected!`);
    logger.debug(`Number of connected sockets: ${io.sockets.size}`);
};
exports.logConnectionChange = logConnectionChange;
const sendDataToSockets = (io, roomToSocketsMap, roomId, data, eventName) => {
    const targetSockets = roomToSocketsMap.get(roomId);
    (0, console_1.log)(targetSockets);
    targetSockets.forEach((socket) => {
        (0, console_1.log)(data);
        io.to(socket).emit(eventName, data);
    });
};
exports.sendDataToSockets = sendDataToSockets;
//# sourceMappingURL=message-gateway.js.map