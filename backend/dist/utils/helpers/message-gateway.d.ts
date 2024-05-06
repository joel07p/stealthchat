import { Namespace, Socket } from "socket.io";
export declare const addSocket: (client: Socket, roomToSocketsMap: Map<string, Set<string>>) => Map<string, Set<string>>;
export declare const sendDataToSockets: (io: Namespace, roomToSocketsMap: Map<string, Set<string>>, roomId: string, data: any, eventName: string) => void;
