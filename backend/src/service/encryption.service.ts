import { Injectable } from "@nestjs/common";
import * as crypto from "crypto" 

@Injectable()
export class EncryptionService {
  decryptMessage(encryptedMessage: string, privateKey: string): string {
    const decryptedBuffer = crypto.privateDecrypt(
      {
        key: privateKey,
        passphrase: '',
      },
      Buffer.from(encryptedMessage, 'base64')
    );
    return decryptedBuffer.toString('utf-8');
  }
  
  encryptMessage(message: string, publicKey: string): string {
    const encryptedBuffer = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      },
      Buffer.from(message, 'utf-8')
    );
    return encryptedBuffer.toString('base64');
  }

  generateKeyPair(): crypto.KeyPairSyncResult<string, string> {
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
    });
  }
}