/// <reference types="node" />
import * as crypto from "crypto";
export declare class EncryptionService {
    decryptMessage(encryptedMessage: string, privateKey: string): string;
    encryptMessage(message: string, publicKey: string): string;
    generateKeyPair(): crypto.KeyPairSyncResult<string, string>;
}
