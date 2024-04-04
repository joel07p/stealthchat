import { AES, enc } from 'crypto-ts'

const secretKey = "makemoresecure1"//import.meta.env.ENCRYPTION_SECRET

export const encryptString = (data: string): string => {
    console.log(secretKey)
    if(!secretKey) return ""
    const encryptedJWT = AES.encrypt(data, secretKey).toString()
    return encryptedJWT
};

export const decryptString = (data: string) => {
    if(!secretKey) return
    const decryptedString = AES.decrypt(data, secretKey).toString(enc.Utf8)
    return decryptedString
};
