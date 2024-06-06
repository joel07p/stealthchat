export declare class EncryptionService {
    private readonly keys;
    constructor();
    static decryptMessage(encryptedMessage: string, privateKey: string): string;
    static encryptMessage(message: string, publicKey: string): string;
    private generateKeyPair;
    getPublicKey(): string;
}
