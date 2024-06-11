import * as crypto from "crypto"
import { useEffect, useState } from "react"

export const useEncryption = () => {
    const [publicKey] = useState<string>()
    const [privateKey] = useState<string>()
    const [serverPublicKey, setServerPublicKey] = useState<string>()

    useEffect(() => {
        //generateKeyPair()
    })

    /*const generateKeyPair = () => {
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
              type: 'spki',
              format: 'pem'
            },
            privateKeyEncoding: {
              type: 'pkcs8',
              format: 'pem'
            }
        })
      
        setPublicKey(publicKey)
        setPrivateKey(privateKey)
    }*/

    const encryptMessage = (message: string) => {
        if (!serverPublicKey) {
          throw new Error('Server public key is not set');
        }
    
        const buffer = Buffer.from(message, 'utf8');
        const encrypted = crypto.publicEncrypt(serverPublicKey, buffer);
        return encrypted.toString('base64');
    }
    
    const decryptMessage = (encryptedMessage: string) => {
        if (!privateKey) {
          throw new Error('Private key is not set');
        }
    
        const buffer = Buffer.from(encryptedMessage, 'base64');
        const decrypted = crypto.privateDecrypt(privateKey, buffer);
        return decrypted.toString('utf8');
    }

    return {
        publicKey,
        serverPublicKey,
        setServerPublicKey,
        encryptMessage,
        decryptMessage
    }
}