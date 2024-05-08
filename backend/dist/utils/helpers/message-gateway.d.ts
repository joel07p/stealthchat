import { Logger } from "@nestjs/common";
import { Namespace, Socket } from "socket.io";
import { SocketWithAuth } from "src/websocket";
export declare const addSocket: (client: Socket, roomToSocketsMap: Map<string, Set<string>>) => Map<string, Set<string>>;
export declare const removeSocket: (client: Socket, roomToSocketsMap: Map<string, Set<string>>) => Map<string, Set<string>>;
export declare const logConnectionChange: (io: Namespace, client: SocketWithAuth, logger: Logger) => void;
export declare const sendDataToSockets: (io: Namespace, roomToSocketsMap: Map<string, Set<string>>, roomId: string, data: any, eventName: string) => void;
