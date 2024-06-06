import CryptoJS from "crypto-js";

// Replace with your desired secret key (ensure strong randomness)
const secretKey = 'your_secret_key_here';

export const masking = (text) =>{
 return CryptoJS.MD5(text).toString();
};
// Function to encrypt text
export const encryptText =(text)=> {
 return CryptoJS.AES.encrypt(text, secretKey).toString();
};

// Function to decrypt text
export const decryptText = (encryptedText) => {
 const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
 return bytes.toString(CryptoJS.enc.Utf8);
};
