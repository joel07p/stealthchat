import { Injectable } from "@nestjs/common";
import * as crypto from "crypto" 

@Injectable()
export class EncryptionService {
  private readonly keys: crypto.KeyPairSyncResult<string, string>

  constructor() {
    this.keys = this.generateKeyPair()
  }

  public static decryptMessage(encryptedMessage: string, privateKey: string): string {
    const decryptedBuffer: Buffer = crypto.privateDecrypt(
      {
        key: privateKey,
        passphrase: '',
      },
      Buffer.from(encryptedMessage, 'base64')
    )

    return decryptedBuffer.toString('utf-8');
  }
  
  public static encryptMessage(message: string, publicKey: string): string {
    const encryptedBuffer: Buffer = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      },
      Buffer.from(message, 'utf-8')
    )

    return encryptedBuffer.toString('base64');
  }

  private generateKeyPair(): crypto.KeyPairSyncResult<string, string> {
    return crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    })
  }

  public getPublicKey(): string {
    return this.keys.publicKey
  }
}